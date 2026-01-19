import React, { useRef, useEffect, useState, useMemo } from 'react';
import { generateDefects } from './DefectGenerator';
import { generateDies, generateMetroCD, generateGradient } from './DieGenerator';
import { color } from 'echarts';

const WaferMap = ({ params }) => {
  const canvasRef = useRef(null);
  const [defects, setDefects] = useState([]);
  const [hoveredDefect, setHoveredDefect] = useState(null);
  const { waferSize, waferEdge } = params;
  const CANVAS_PADDING = 1; // 캔버스 패딩 (px)

  const usableSize = params.waferPixelSize - 2 * CANVAS_PADDING; // 패딩을 제외한 실제 그리기 영역
  const center = params.waferPixelSize / 2; // 전체 캔버스 중심
  const scale = usableSize / waferSize; // 패딩을 제외한 크기 기준으로 스케일 계산

  // useMemo를 이용하여 DieGenerator로 dies 생성
  const dies = useMemo(() => {
    return generateDies(params);
  }, [params]);

  // Color List 설정
  const stepCount = 50;
  const colors = useMemo(() => {
    return generateGradient('#e9db5e', '#2b38b3', stepCount);
  }, [stepCount]);

  var itemvalues = [];
  var minvalue = 0;
  var maxvalue = 0;
  var stepvalue = 0;

  if (params.mapType === 'MEASURE') {
    itemvalues = dies.map((d) => d.itemValue);
    minvalue = Math.min(...itemvalues);
    maxvalue = Math.max(...itemvalues);
    stepvalue = (maxvalue - minvalue) / stepCount;
  }

  const defectDatas = useMemo(() => {
    // DefectGenerator 호출하여 데이터 생성
    if (params.mapType === 'DEFECT')
      return generateDefects(params, 150, 3, 2, 123); // (range, numRandom, numClusters, numScratches, seed)
    else return [];
  }, [params]);

  const cds = useMemo(() => {
    // Metro CD Generator 호출하여 데이터 생성
    if (params.mapType === 'METRO-CD') return generateMetroCD(params, 2000);
    else return [];
  }, [params]);

  const handleMouseMove = (e) => {
    if (params.mapType !== 'DEFECT') {
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

  if (params.mapType === 'METRO-CD') {
    itemvalues = cds.map((d) => d.cdValue);
    minvalue = Math.min(...itemvalues);
    maxvalue = Math.max(...itemvalues);
    stepvalue = (maxvalue - minvalue) / stepCount;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 캔버스 해상도 최적화 (Retina 대응)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = params.waferPixelSize * dpr;
    canvas.height = params.waferPixelSize * dpr;
    ctx.scale(dpr, dpr);

    // 캔버스 초기화
    ctx.clearRect(0, 0, params.waferPixelSize, params.waferPixelSize);

    ctx.save();
    // 좌표계 변환
    ctx.translate(center, center);
    ctx.scale(scale, -scale); // 사사분면 반전

    // 1. 웨이퍼 외곽 (Circle)
    ctx.beginPath();
    ctx.arc(0, 0, waferSize / 2, 0, Math.PI * 2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1 / scale;
    ctx.stroke();

    // 2-1. notch Darw
    const notchsize = params.waferSize * 0.015;
    ctx.beginPath();
    ctx.clearRect(-notchsize / 2.0, -params.waferSize / 2 - 3000, notchsize, notchsize);
    ctx.stroke();
    ctx.moveTo(-notchsize / 2.0, -params.waferSize / 2);
    ctx.lineTo(0, -params.waferSize / 2 + notchsize);
    ctx.moveTo(notchsize / 2, -params.waferSize / 2);
    ctx.lineTo(0, -params.waferSize / 2 + notchsize);
    ctx.stroke();

    // 2. 유효 영역 (Edge Exclusion 반영)
    ctx.beginPath();
    ctx.arc(0, 0, waferSize / 2 - waferEdge, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.stroke();

    // 3. 샘플 Die (격자) 그리기 - DieGenerator로 생성된 dies 사용
    ctx.strokeStyle = '#d9d9e4';

    dies.forEach((die) => {
      if (params.mapType === 'EDS') {
        if (die.status === 'Good') {
          ctx.fillStyle = '#392abe';
        } else {
          ctx.fillStyle = '#e02f38';
        }
        ctx.fillRect(die.x, die.y, die.width, die.height);
      } else if (params.mapType === 'MEASURE') {
        // MEASURE Map Chip Value별 Color 설정 기능
        var idx = (die.itemValue - minvalue) / stepvalue;
        ctx.fillStyle = colors[idx >= stepCount ? stepCount - 1 : idx];
        ctx.fillRect(die.x, die.y, die.width, die.height);
      } else if (params.mapType === 'DEFECT' || params.mapType === 'METRO-CD') {
        //ctx.lineWidth = 1;
        ctx.strokeRect(die.x, die.y, die.width, die.height);
      }
      // dieSize도 데이터 단위 그대로 사용
    });

    // 4. DEFECT Map 인 경우 Defect Draw
    if (params.mapType === 'DEFECT') {
      setDefects(defectDatas);
      defectDatas.forEach((defect) => {
        ctx.fillStyle = defect.color;
        ctx.beginPath();
        // Defect 크기를 데이터 단위로 받지만, 화면에선 일정 픽셀 크기로 보이도록 조정
        // 이 예제에서는 2픽셀 반경으로 고정 (scaleFactor 역변환)
        var renderRadius = 2 / scale;
        ctx.arc(defect.x, defect.y, renderRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 4. DEFECT Map 인 경우 Defect Draw
    if (params.mapType === 'METRO-CD') {
      cds.forEach((cd) => {
        var idx = (cd.cdValue - minvalue) / stepvalue;
        ctx.fillStyle = colors[idx >= stepCount ? stepCount - 1 : idx];
        ctx.beginPath();
        // Defect 크기를 데이터 단위로 받지만, 화면에선 일정 픽셀 크기로 보이도록 조정
        // 이 예제에서는 2픽셀 반경으로 고정 (scaleFactor 역변환)
        var renderRadius = 3 / scale;
        ctx.arc(cd.x, cd.y, renderRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    ctx.restore();
  }, [waferSize, waferEdge, usableSize, params]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={params.waferPixelSize}
        height={params.waferPixelSize}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredDefect(null)}
        style={{
          background: '#fff',
          padding: `${CANVAS_PADDING}px`,
          boxSizing: 'border-box',
        }}
      />
      {hoveredDefect && (
        <div
          style={{
            position: 'fixed',
            left: hoveredDefect.px + 15,
            top: hoveredDefect.py + 15,
            backgroundColor: '#1a1a1a',
            color: '#00ff00', // 터미널 느낌의 가독성
            padding: '8px',
            borderRadius: '2px',
            fontSize: '11px',
            pointerEvents: 'none',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
            fontFamily: 'monospace',
            textAlign: 'left',
          }}
        >
          <div>[DEFECT INFO]</div>
          <hr style={{ borderColor: '#333' }} />
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
