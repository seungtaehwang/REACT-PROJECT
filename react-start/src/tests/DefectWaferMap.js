import React, { useEffect, useRef, useState } from 'react';

const DefectWaferMap = ({ id, waferSize = 300000 }) => {
  const canvasRef = useRef(null);
  const [defects, setDefects] = useState([]);
  const [hoveredDefect, setHoveredDefect] = useState(null);

  // 1. UI 설정값
  const displaySize = 400; // 실제 브라우저에 보여줄 픽셀 크기
  const center = displaySize / 2;
  const radius = displaySize / 2 - 10; // 여백 제외 반지름
  
  // 2. Scale Factor 계산 (300,000 단위를 displaySize로 매핑)
  // 실제 좌표 150,000(끝단)이 radius(픽셀)에 닿아야 함
  const scale = radius / (waferSize / 2);

  useEffect(() => {
    // 샘플 데이터 생성 (좌표 범위: -150,000 ~ 150,000)
    const maxCoord = waferSize / 2;
    const sampleData = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * waferSize,
      y: (Math.random() - 0.5) * waferSize,
      size: Math.random() * 5000, // 디펙트 자체 크기도 큰 단위일 경우 가정
    })).filter(d => Math.sqrt(d.x**2 + d.y**2) <= maxCoord);

    setDefects(sampleData);
    draw(sampleData);
  }, [id, waferSize]);

  const draw = (data) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, displaySize, displaySize);

    // 가이드 축
    ctx.strokeStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.moveTo(center, 0); ctx.lineTo(center, displaySize);
    ctx.moveTo(0, center); ctx.lineTo(displaySize, center);
    ctx.stroke();

    // 웨이퍼 외곽선
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // 디펙트 렌더링
    data.forEach(d => {
      const cvsX = center + (d.x * scale);
      const cvsY = center - (d.y * scale);

      ctx.fillStyle = 'red';
      ctx.beginPath();
      // 점 크기는 화면 가독성을 위해 최소 2px 유지
      ctx.arc(cvsX, cvsY, 2, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // 역계산: 마우스 위치(픽셀)를 데이터 좌표(300,000 단위)로 변환
    const dataX = (mx - center) / scale;
    const dataY = (center - my) / scale;

    // 데이터 좌표계 상에서 거리 계산 (임계값도 scale에 맞춰 조정)
    const threshold = 5 / scale; // 화면상 5px 정도의 오차 허용
    const found = defects.find(d => {
      const dist = Math.sqrt((d.x - dataX)**2 + (d.y - dataY)**2);
      return dist < threshold;
    });

    if (found) {
      setHoveredDefect({ ...found, px: e.clientX, py: e.clientY });
    } else {
      setHoveredDefect(null);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <canvas 
        ref={canvasRef} 
        width={displaySize} 
        height={displaySize}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredDefect(null)}
        style={{ border: '1px solid #ccc', background: '#fff' }}
      />
      
      {hoveredDefect && (
        <div style={{
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
          textAlign: 'left'
        }}>
          <div>[DEFECT INFO]</div>
          <hr style={{ borderColor: '#333' }}/>
          ID: {hoveredDefect.id}<br/>
          X: {hoveredDefect.x.toFixed(0)} nm<br/>
          Y: {hoveredDefect.y.toFixed(0)} nm
        </div>
      )}
    </div>
  );
};

export default DefectWaferMap;