import React, { useState } from 'react';
import Header from './tests/Header';
import Layout from './tests/Layout';

function App() {
  const [gridConfig, setGridConfig] = useState({
    columnCount: 3, // 기본값 3열
    isActive: false,
  });

  const handleDraw = (cols) => {
    setGridConfig({
      columnCount: parseInt(cols),
      isActive: true,
    });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header onDraw={handleDraw} />
      <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f0f2f5' }}>
        {gridConfig.isActive && <Layout columnCount={gridConfig.columnCount} />}
      </main>
    </div>
  );
}

export default App;
