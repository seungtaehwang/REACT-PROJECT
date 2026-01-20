import React, { useMemo } from 'react';
import WaferMap from './WaferMap';
import Legend from './Legend';

const Layout = ({ config }) => {
  const { type, count } = config;
  const showLegend = type !== 'Measure';

  // 가상의 데이터 생성 (각 맵의 Legend 정보를 취합하는 예시)
  const allLegendItems = useMemo(() => {
    if (type === 'Bin')
      return [
        { label: 'Pass', color: 'green' },
        { label: 'Fail', color: 'red' },
      ];
    if (type === 'Defect')
      return [
        { label: 'Particle', color: 'orange' },
        { label: 'Scratch', color: 'blue' },
      ];
    return [];
  }, [type]);

  return (
    <div style={{ display: 'flex', height: '100%', padding: '20px', gap: '20px' }}>
      {/* 3열 차트 영역 */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3px',
          alignContent: 'start',
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ddd', height: '300px' }}>
            <WaferMap type={type} size={300000} />
          </div>
        ))}
      </div>

      {/* 우측 20% Legend 영역 (조건부 노출) */}
      {showLegend && (
        <aside
          style={{
            height: '900px',
            width: '150px',
            background: '#fff',
            border: '1px solid #ddd',
            padding: '10px',
          }}
        >
          <Legend items={allLegendItems} title={type} />
        </aside>
      )}
    </div>
  );
};

export default Layout;
