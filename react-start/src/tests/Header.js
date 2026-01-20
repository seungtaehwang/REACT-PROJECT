import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const Header = ({ onDraw }) => {
  const [inputs, setInputs] = useState({
    waferSize: 300,
    waferEdge: 3,
    dieX: 10,
    dieY: 10,
    scribe: 0.1,
    mapType: 'EDS',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: name === 'mapType' ? value : Number(value) }));
  };

  const handleExcelExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('WaferMap_Report');
    const canvases = document.querySelectorAll('canvas');

    worksheet.addRow(['Wafer Map Inspection Report']).font = { bold: true, size: 14 };
    worksheet.addRow(['Type', inputs.mapType, 'Date', new Date().toLocaleString()]);
    worksheet.addRow([]);

    for (let i = 0; i < canvases.length; i++) {
      const imageId = workbook.addImage({
        base64: canvases[i].toDataURL('image/png'),
        extension: 'png',
      });
      // 엑셀에 맵을 순차적으로 삽입 (B열부터 시작)
      worksheet.addImage(imageId, {
        tl: { col: 1, row: 5 + i * 25 },
        ext: { width: 400, height: 400 },
      });
      worksheet.getCell(5 + i * 25, 1).value = `Map #${i + 1}`;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `WaferReport_${inputs.mapType}.xlsx`);
  };

  return (
    <header
      style={{
        padding: '15px',
        background: '#2c3e50',
        color: 'white',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <input
        name="waferSize"
        type="number"
        value={inputs.waferSize}
        onChange={handleChange}
        title="Wafer Size"
        style={inputStyle}
      />
      <input
        name="dieX"
        type="number"
        value={inputs.dieX}
        onChange={handleChange}
        title="Die X"
        style={inputStyle}
      />
      <input
        name="dieY"
        type="number"
        value={inputs.dieY}
        onChange={handleChange}
        title="Die Y"
        style={inputStyle}
      />
      <select name="mapType" value={inputs.mapType} onChange={handleChange} style={inputStyle}>
        <option value="EDS">EDS</option>
        <option value="Measure">Measure</option>
        <option value="Defect">Defect</option>
      </select>
      <button onClick={() => onDraw(inputs)} style={{ ...btnStyle, background: '#3498db' }}>
        Draw
      </button>
      <button onClick={handleExcelExport} style={{ ...btnStyle, background: '#27ae60' }}>
        Excel
      </button>
    </header>
  );
};

const inputStyle = { padding: '5px', borderRadius: '4px', border: 'none', width: '80px' };
const btnStyle = {
  padding: '6px 15px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default Header;
