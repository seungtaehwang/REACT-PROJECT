import React, { useState } from 'react';
import Header from './tests/Header';
import Layout from './tests/Layout';

function App() {
  const [config, setConfig] = useState({
    waferSize: 300, // mm
    waferEdge: 3, // mm
    dieX: 10, // mm
    dieY: 10, // mm
    scribe: 0.1, // mm
    mapType: 'EDS',
    drawTrigger: 0, // Draw 버튼 클릭 시 맵을 갱신하기 위한 트리거
  });

  const handleDraw = (newConfig) => {
    setConfig({ ...newConfig, drawTrigger: Date.now() });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onDraw={handleDraw} />
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f0f2f5', padding: '20px' }}>
        <Layout config={config} />
      </div>
    </div>
  );
}

export default App;
