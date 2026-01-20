import React, { useState } from 'react';
import WaferMap from './WaferMap';

const GalleryLayout = ({ config }) => {
  // 현재 확대된 맵의 인덱스나 ID를 저장 (null이면 전체 보기)
  const [selectedMapId, setSelectedMapId] = useState(null);

  // 1. 상세 보기 화면 (확대된 맵 1개)
  if (selectedMapId !== null) {
    return (
      <div style={{ width: '100%', height: '100%', padding: '20px' }}>
        <button
          onClick={() => setSelectedMapId(null)}
          style={{ marginBottom: '10px', cursor: 'pointer' }}
        >
          ← 목록으로 돌아가기
        </button>
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 50px)',
            background: '#fff',
            border: '2px solid #3498db',
          }}
        >
          {/* 크게 보여줄 WaferMap */}
          <WaferMap
            type={config.type}
            size={300000}
            id={selectedMapId}
            isDetail={true} // 상세 모드임을 알리는 prop (선택사항)
          />
        </div>
      </div>
    );
  }

  // 2. 갤러리 목록 화면 (3열 그리드)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        padding: '20px',
      }}
    >
      {Array.from({ length: config.count }).map((_, i) => (
        <div
          key={i}
          onDoubleClick={() => setSelectedMapId(i)} // 더블클릭 시 ID 설정
          style={{
            background: 'white',
            border: '1px solid #ddd',
            height: '300px',
            cursor: 'zoom-in', // 확대 가능하다는 표시
            transition: 'transform 0.2s',
          }}
          title="더블클릭하여 확대"
        >
          <WaferMap type={config.type} size={300000} id={i} />
        </div>
      ))}
    </div>
  );
};

export default GalleryLayout;
