import React from 'react';
import WaferMap from './WaferMap';

const Layout = ({ config }) => {
  // 9개의 맵 생성
  const mapList = Array.from({ length: 9 });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3열 배치
        gap: '20px',
        justifyItems: 'center',
      }}
    >
      {mapList.map((_, index) => (
        <div
          key={index}
          style={{
            background: 'white',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '5px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            Map #{index + 1}
          </div>
          <WaferMap id={`map_${index}`} config={config} />
        </div>
      ))}
    </div>
  );
};

export default Layout;
