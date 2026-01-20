import React, { useEffect, useRef } from 'react';

const WaferMap = ({ id, config }) => {
  const canvasRef = useRef(null);
  const VIRTUAL_SIZE = 300000; // 300,000 um 고정 사이즈

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const displaySize = canvas.width;
    const center = displaySize / 2;
    const scale = displaySize / VIRTUAL_SIZE; // 픽셀 변환 비율

    // mm 단위를 um 단위로 환산하여 계산
    const mmToUm = 1000;
    const vDieX = (config.dieX + config.scribe) * mmToUm * scale;
    const vDieY = (config.dieY + config.scribe) * mmToUm * scale;
    const vRadius = (config.waferSize / 2) * mmToUm * scale;

    // 초기화
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, displaySize, displaySize);

    // 1. 웨이퍼 외곽선 그리기
    ctx.beginPath();
    ctx.arc(center, center, vRadius, 0, Math.PI * 2);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 2. 사사분면 좌표 기반 Die 드로잉 (중심 0,0 기준)
    ctx.strokeStyle =
      config.mapType === 'EDS' ? '#00ff00' : config.mapType === 'Measure' ? '#00ffff' : '#ff4444';
    ctx.lineWidth = 0.5;

    for (let x = -vRadius; x < vRadius; x += vDieX) {
      for (let y = -vRadius; y < vRadius; y += vDieY) {
        // 원의 방정식 적용 (x^2 + y^2 <= r^2)
        if (Math.sqrt(x * x + y * y) <= vRadius) {
          // 캔버스 좌표계 보정 (중심 좌표 + 사사분면 좌표)
          ctx.strokeRect(center + x, center + y, vDieX, vDieY);
        }
      }
    }

    // 3. 중심 가이드 축 (Crosshair)
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.moveTo(center, 0);
    ctx.lineTo(center, displaySize);
    ctx.moveTo(0, center);
    ctx.lineTo(displaySize, center);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [config]); // config 변경 시마다 재드로잉

  return (
    <canvas
      ref={canvasRef}
      id={id}
      width={300}
      height={300}
      style={{ border: '1px solid #333', display: 'block' }}
    />
  );
};

export default WaferMap;
