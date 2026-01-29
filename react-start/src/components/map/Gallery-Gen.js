import React, { useState } from 'react';
import WaferMap from './WaferMap'; // 이전에 만든 단일 웨이퍼 컴포넌트
import Legend from './Legend';

const Layout = ({ params }) => {
  // 현재 확대된 맵의 인덱스나 ID를 저장 (null이면 전체 보기)
  const [selectedMapId, setSelectedMapId] = useState(null);

  // 6개의 웨이퍼 맵 고정 표시
  const waferList = [];
  for (let i = waferList.length; i < params.mapCount; i++) {
    waferList.push(i + 1);
  }

  // 레이아웃 설정값
  const layout = {
    width: window.innerWidth - 35, // 전체 너비 (여유값 제외)
    height: window.innerHeight - 35,
  };
  const gap = 3; // 그리드 gap
  const pad = 10; // 각 웨이퍼 아이템 padding

  // size 계산: (layout.width - gap - 2 * pad) / params.columnCount
  const totalGapWidth = (params.columnCount - 1) * gap;
  const totalPaddingWidth = params.columnCount * 2 * pad + 150;
  const size = Math.floor((layout.width - totalGapWidth - totalPaddingWidth) / params.columnCount);
  params.waferPixelSize = size;

  // 1. 표시할 데이터 배열
  const statusData = [
    { id: 1, label: '정상', color: '#10b981' }, // 초록색
    { id: 2, label: '경고', color: '#f59e0b' }, // 주황색
    { id: 3, label: '위험', color: '#ef4444' }, // 빨간색
    { id: 4, label: '비활성', color: '#9ca3af' }, // 회색
  ];

  if (selectedMapId !== null) {
    const dtotalGapWidth = (1 - 1) * gap;
    const dtotalPaddingWidth = 1 * 2 * pad + 150;
    const dsize = Math.floor(
      ((layout.height < layout.width ? layout.height : layout.width) -
        dtotalGapWidth -
        dtotalPaddingWidth) /
        1,
    );
    params.waferPixelSize = dsize;
    return (
      <div style={{ display: 'flex', height: '100%', padding: '5px', gap: '5px' }}>
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 50px)',
            background: '#fff',
            border: '2px solid #3498db',
          }}
        >
          <button
            onClick={() => setSelectedMapId(null)}
            style={{ marginBottom: '10px', cursor: 'pointer' }}
          >
            ← 목록으로 돌아가기
          </button>
          <div
            style={{
              border: '1px solid #ddd',
              padding: '5px',
              textAlign: 'center',
            }}
          >
            <WaferMap
              params={params} // Header로부터 전달받은 인자들
              isDetail={true} // 상세 모드임을 알리는 prop (선택사항)
            />
          </div>
        </div>
        <aside
          style={{
            width: '140px',
            background: '#fff',
            //border: '1px solid #ddd',
            padding: '5px',
          }}
        >
          <Legend items={statusData} title={params.mapType + ' 범례'} />
        </aside>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100%', padding: '5px', gap: '5px' }}>
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
            onDoubleClick={() => setSelectedMapId(id)} // 더블클릭 시 ID 설정
            style={{
              border: '1px solid #ddd',
              padding: '5px',
              textAlign: 'center',
            }}
          >
            <h4>Wafer #{id}</h4>
            <WaferMap
              params={params} // Header로부터 전달받은 인자들
              isDetail={false} // 상세 모드임을 알리는 prop (선택사항)
            />
          </div>
        ))}
      </div>
      <aside
        style={{
          width: '140px',
          background: '#fff',
          //border: '1px solid #ddd',
          padding: '5px',
        }}
      >
        <Legend items={statusData} title={params.mapType + ' 범례'} />
      </aside>
    </div>
  );
};

export default Layout;
