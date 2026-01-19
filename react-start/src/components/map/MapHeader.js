import React, { useState } from 'react';

const Header = ({ onDraw }) => {
  const [inputs, setInputs] = useState({
    waferSize: 300000,
    waferEdge: 3000,
    dieSizeX: 9000,
    dieSizeY: 9000,
    scribeSize: 200,
    columnCount: 3,
    mapCount: 6,
    waferPixelSize: 300,
    mapType: 'EDS',
    dieData: [],
    defectData: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // mapType은 문자열, 나머지는 숫자로 변환
    const newValue = name === 'mapType' ? value : Number(value);
    setInputs((prev) => ({ ...prev, [name]: newValue }));
  };

  const onClickDraw = () => {
    onDraw(inputs);
  };

  return (
    <header
      style={{
        padding: '15px 20px',
        background: '#316da8',
        color: 'white',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '15px' }}>
        <label>
          Size:{' '}
          <input
            name="waferSize"
            type="number"
            value={inputs.waferSize}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Edge:{' '}
          <input
            name="waferEdge"
            type="number"
            value={inputs.waferEdge}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Die X:{' '}
          <input
            name="dieSizeX"
            type="number"
            value={inputs.dieSizeX}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Die Y:{' '}
          <input
            name="dieSizeY"
            type="number"
            value={inputs.dieSizeY}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Scribe:{' '}
          <input
            name="scribeSize"
            type="number"
            value={inputs.scribeSize}
            onChange={handleChange}
            style={styles.input}
          />
        </label>

        <label>
          Cols:
          <select
            name="columnCount"
            value={inputs.columnCount}
            onChange={handleChange}
            style={styles.input}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </label>
        <label>
          Map Count:
          <select
            name="mapCount"
            value={inputs.mapCount}
            onChange={handleChange}
            style={styles.input}
          >
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            <option value={60}>60</option>
          </select>
        </label>
        <label>
          Map Type:
          <select
            name="mapType"
            value={inputs.mapType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="EDS">EDS</option>
            <option value="MEASURE">MEASURE</option>
            <option value="DEFECT">DEFECT</option>
            <option value="METRO-CD">METRO-CD</option>
          </select>
        </label>

        <button onClick={onClickDraw} style={styles.button}>
          Draw
        </button>
      </div>
    </header>
  );
};

const styles = {
  input: { width: '80px', padding: '5px', marginLeft: '5px' },
  button: {
    padding: '8px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Header;
