import React, { useState } from 'react';

const Header = ({ onDraw }) => {
  const [type, setType] = useState('Bin');
  const [count, setCount] = useState(3);

  return (
    <header
      style={{
        height: '60px',
        background: '#333',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '20px',
      }}
    >
      <strong>Wafer Analyzer</strong>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Bin">Bin</option>
        <option value="Measure">Measure</option>
        <option value="Defect">Defect</option>
      </select>
      <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
        {[3, 6, 9, 12].map((n) => (
          <option key={n} value={n}>
            {n} Maps
          </option>
        ))}
      </select>
      <button onClick={() => onDraw({ type, count })}>Draw</button>
    </header>
  );
};

export default Header;
