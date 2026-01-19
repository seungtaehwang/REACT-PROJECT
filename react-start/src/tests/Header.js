import React, { useState } from 'react';

const Header = ({ onDraw }) => {
  const [cols, setCols] = useState(3);

  return (
    <header style={{ padding: '15px', background: '#2c3e50', color: 'white', display: 'flex', gap: '15px', alignItems: 'center' }}>
      <label>Column Count:</label>
      <select 
        value={cols} 
        onChange={(e) => setCols(e.target.value)}
        style={{ padding: '5px', borderRadius: '4px' }}
      >
        <option value="1">1 Column</option>
        <option value="2">2 Columns</option>
        <option value="3">3 Columns</option>
        <option value="6">6 Columns</option>
      </select>
      
      <button 
        onClick={() => onDraw(cols)}
        style={{ padding: '6px 15px', cursor: 'pointer', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Draw
      </button>
    </header>
  );
};

export default Header;