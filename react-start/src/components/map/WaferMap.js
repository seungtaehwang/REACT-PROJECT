import React, { useRef, useEffect, useState, useMemo } from "react";
import { generateDefects } from "./DefectGenerator";
import { generateDies } from "./DieGenerator";

const WaferMap = ({ WaferPixelsize, params }) => {
  const canvasRef = useRef(null);
  const [defects, setDefects] = useState([]);
  const [hoveredDefect, setHoveredDefect] = useState(null);
  const { waferSize, waferEdge } = params;
  const CANVAS_PADDING = 1; // 캔버스 패딩 (px)

  const usableSize = WaferPixelsize - 2 * CANVAS_PADDING; // 패딩을 제외한 실제 그리기 영역
  const center = WaferPixelsize / 2; // 전체 캔버스 중심
  const scale = usableSize / waferSize; // 패딩을 제외한 크기 기준으로 스케일 계산

  // useMemo를 이용하여 DieGenerator로 dies 생성
  const dies = useMemo(() => {
    return generateDies(params);
  }, [params]);

  const defectdatas = useMemo(() => {
    // DefectGenerator 호출하여 데이터 생성
    if (params.mapType === "DEFECT")
      return generateDefects(params, 150, 3, 2, 123); // (range, numRandom, numClusters, numScratches, seed)
    else return [];
  }, [params]);

  useEffect(() => {
    console.log(params.mapType);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 캔버스 해상도 최적화 (Retina 대응)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = WaferPixelsize * dpr;
    canvas.height = WaferPixelsize * dpr;
    ctx.scale(dpr, dpr);

    // 캔버스 초기화
    ctx.clearRect(0, 0, WaferPixelsize, WaferPixelsize);

    ctx.save();
    // 좌표계 변환
    ctx.translate(center, center);
    ctx.scale(scale, -scale); // 사사분면 반전

    // 1. 웨이퍼 외곽 (Circle)
    ctx.beginPath();
    ctx.arc(0, 0, waferSize / 2, 0, Math.PI * 2);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1 / scale;
    ctx.stroke();

    // 2-1. notch Darw
    const notchsize = params.waferSize * 0.015;
    ctx.beginPath();
    ctx.clearRect(
      -notchsize / 2.0,
      -params.waferSize / 2 - 3000,
      notchsize,
      notchsize,
    );
    ctx.stroke();
    ctx.moveTo(-notchsize / 2.0, -params.waferSize / 2);
    ctx.lineTo(0, -params.waferSize / 2 + notchsize);
    ctx.moveTo(notchsize / 2, -params.waferSize / 2);
    ctx.lineTo(0, -params.waferSize / 2 + notchsize);
    ctx.stroke();

    // 2. 유효 영역 (Edge Exclusion 반영)
    ctx.beginPath();
    ctx.arc(0, 0, waferSize / 2 - waferEdge, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
    ctx.stroke();

    // 3. 샘플 Die (격자) 그리기 - DieGenerator로 생성된 dies 사용
    ctx.strokeStyle = "#d9d9e4";

    dies.forEach((die) => {
      if (params.mapType === "EDS" || params.mapType === "MEASURE") {
        if (die.status === "Good") {
          ctx.fillStyle = "#392abe";
        } else {
          ctx.fillStyle = "#e02f38";
        }
        ctx.fillRect(die.x, die.y, die.width, die.height);
      } else if (params.mapType === "DEFECT") {
        //ctx.lineWidth = 1;
        ctx.strokeRect(die.x, die.y, die.width, die.height);
      }
      // dieSize도 데이터 단위 그대로 사용
    });

    // 4. DEFECT Map 인 경우 Defect Draw
    if (params.mapType === "DEFECT") {
      setDefects(defectdatas);
      defectdatas.forEach((defect) => {
        ctx.fillStyle = defect.color;
        ctx.beginPath();
        // Defect 크기를 데이터 단위로 받지만, 화면에선 일정 픽셀 크기로 보이도록 조정
        // 이 예제에서는 2픽셀 반경으로 고정 (scaleFactor 역변환)
        const renderRadius = 2 / scale;
        ctx.arc(defect.x, defect.y, renderRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    ctx.restore();
  }, [dies, WaferPixelsize, waferSize, waferEdge, usableSize, params]);

  const handleMouseMove = (e) => {
    if (params.mapType !== "DEFECT") {
      setHoveredDefect(null);
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // 역계산: 마우스 위치(픽셀)를 데이터 좌표(300,000 단위)로 변환
    const dataX = (mx - center) / scale;
    const dataY = (center - my) / scale;

    // 데이터 좌표계 상에서 거리 계산 (임계값도 scale에 맞춰 조정)
    const threshold = 5 / scale; // 화면상 5px 정도의 오차 허용
    const found = defects.find((d) => {
      const dist = Math.sqrt((d.x - dataX) ** 2 + (d.y - dataY) ** 2);
      return dist < threshold;
    });

    if (found) {
      setHoveredDefect({ ...found, px: e.clientX, py: e.clientY });
    } else {
      setHoveredDefect(null);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={WaferPixelsize}
        height={WaferPixelsize}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredDefect(null)}
        style={{
          background: "#fff",
          padding: `${CANVAS_PADDING}px`,
          boxSizing: "border-box",
        }}
      />
      {hoveredDefect && (
        <div
          style={{
            position: "fixed",
            left: hoveredDefect.px + 15,
            top: hoveredDefect.py + 15,
            backgroundColor: "#1a1a1a",
            color: "#00ff00", // 터미널 느낌의 가독성
            padding: "8px",
            borderRadius: "2px",
            fontSize: "11px",
            pointerEvents: "none",
            boxShadow: "4px 4px 0px rgba(0,0,0,0.2)",
            fontFamily: "monospace",
            textAlign: "left",
          }}
        >
          <div>[DEFECT INFO]</div>
          <hr style={{ borderColor: "#333" }} />
          ID: {hoveredDefect.id}
          <br />
          X: {hoveredDefect.x.toFixed(0)} nm
          <br />
          Y: {hoveredDefect.y.toFixed(0)} nm
          <br />
          TYPE: {hoveredDefect.type}
          <br />
          SIZE: {hoveredDefect.size.toFixed(0)} nm
        </div>
      )}
    </>
  );
};

export default WaferMap;
