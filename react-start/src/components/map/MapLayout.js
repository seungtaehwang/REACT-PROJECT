import React from 'react';
import WaferMap from './WaferMap'; // 이전에 만든 단일 웨이퍼 컴포넌트

const Layout = ({ params }) => {
  // 6개의 웨이퍼 맵 고정 표시
  const waferList = [];
  for (let i = waferList.length; i < params.mapCount; i++) {
    waferList.push(i + 1);
  }

  // 레이아웃 설정값
  const layout = {
    width: window.innerWidth - 35, // 전체 너비 (여유값 제외)
  };
  const gap = 3; // 그리드 gap
  const pad = 10; // 각 웨이퍼 아이템 padding

  // size 계산: (layout.width - gap - 2 * pad) / params.columnCount
  const totalGapWidth = (params.columnCount - 1) * gap;
  const totalPaddingWidth = params.columnCount * 2 * pad;
  const size = Math.floor((layout.width - totalGapWidth - totalPaddingWidth) / params.columnCount);
  params.waferPixelSize = size;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${params.columnCount}, 1fr)`,
        gap: '3px',
        padding: '5px',
      }}
    >
      {waferList.map((id) => (
        <div
          key={id}
          style={{
            border: '1px solid #ddd',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          <h4>Wafer #{id}</h4>
          <WaferMap
            params={params} // Header로부터 전달받은 인자들
          />
        </div>
      ))}
    </div>
  );
};

export default Layout;
