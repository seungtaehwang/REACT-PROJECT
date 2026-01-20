import React from 'react';

const WaferMap = ({ type, size }) => {
  const radius = size / 2; // 150,000um

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 5, left: 10, fontSize: '12px', fontWeight: 'bold' }}>
        {type}
      </div>
      <svg
        viewBox={`${-radius} ${-radius} ${size} ${size}`}
        style={{ width: '100%', height: '100%', transform: 'scaleY(-1)' }} // Y축 방향 수학적 좌표계로 일치
      >
        {/* Wafer Outer Circle */}
        <circle cx="0" cy="0" r={radius} fill="none" stroke="#ccc" strokeWidth="1000" />

        {/* 사사분면 가이드 라인 */}
        <line x1={-radius} y1="0" x2={radius} y2="0" stroke="#eee" strokeWidth="500" />
        <line x1="0" y1={-radius} x2="0" y2={radius} stroke="#eee" strokeWidth="500" />

        {/* 샘플 데이터: 1사분면(+,+)에 점 찍기 */}
        <rect x="50000" y="50000" width="8000" height="8000" fill="blue" />
        {/* 샘플 데이터: 3사분면(-,-)에 점 찍기 */}
        <rect x="-100000" y="-80000" width="8000" height="8000" fill="red" />
      </svg>
    </div>
  );
};

export default WaferMap;
