import React, { useState } from 'react';
import Header from './tests/Header';
import Layout from './tests/Layout copy';

const App = () => {
  const [config, setConfig] = useState({ type: 'Bin', count: 3 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onDraw={(newConfig) => setConfig(newConfig)} />
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
        <Layout config={config} />
      </div>
    </div>
  );
};

export default App;
