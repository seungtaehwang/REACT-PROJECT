import React from 'react';

const Legend = ({ items, title }) => {
  return (
    <div>
      <h5 style={{ borderBottom: '1px solid #eee', pb: '10px' }}>{title} Legend</h5>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', gap: '10px' }}
          >
            <div
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: item.color,
                borderRadius: '2px',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: '14px' }}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
