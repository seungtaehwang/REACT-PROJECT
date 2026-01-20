import React from 'react';

const StatusLegend = ({ items, title }) => {
  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        width: 'fit-content',
      }}
    >
      <h5 style={{ marginBottom: '12px' }}>{title ? title : '테스트 정보 범례'}</h5>

      {/* 2. map을 이용한 반복 렌더링 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {/* 색상 사각형 */}
            <div
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: item.color,
                borderRadius: '2px',
              }}
            />
            {/* 텍스트 */}
            <span style={{ fontSize: '14px', color: '#333' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusLegend;
