import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const Header = ({ onTypeChange, onDataSelect, onLibraryChange, onColumnCountChange }) => {
  const handleExcelExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('WaferMap_Report');
    const canvases = document.querySelectorAll('canvas');

    worksheet.addRow(['Wafer Map Inspection Report']).font = { bold: true, size: 14 };
    worksheet.addRow(['Type', 'test', 'Date', new Date().toLocaleString()]);
    worksheet.addRow([]);

    for (let i = 0; i < canvases.length; i++) {
      const imageId = workbook.addImage({
        base64: canvases[i].toDataURL('image/png'),
        extension: 'png',
      });
      // 엑셀에 맵을 순차적으로 삽입 (B열부터 시작)
      worksheet.addImage(imageId, {
        tl: { col: 1, row: 5 + i * 25 },
        ext: { width: canvases[i].width, height: canvases[i].height },
      });
      worksheet.getCell(5 + i * 25, 1).value = `Map #${i + 1}`;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `WaferReport_test.xlsx`);
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
      <button onClick={() => onDataSelect('A 세트')} style={{ cursor: 'pointer' }}>
        데이터 A
      </button>
      <button onClick={() => onDataSelect('B 세트')} style={{ cursor: 'pointer' }}>
        데이터 B
      </button>
      <button onClick={handleExcelExport} style={{ background: '#27ae60' }}>
        Excel
      </button>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
        {/* 1. 엔진 선택 (ECharts vs Chart.js) */}
        <label>
          엔진:
          <select onChange={(e) => onLibraryChange(e.target.value)} style={{ marginLeft: '5px' }}>
            <option value="echarts">Apache ECharts</option>
            <option value="chartjs">Chart.js</option>
          </select>
        </label>

        {/* 2. Column Count 선택 */}
        <label>
          Chart Count:
          <select
            onChange={(e) => onColumnCountChange(e.target.value)}
            style={{ marginLeft: '5px' }}
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
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            <option value={60}>60</option>
          </select>
        </label>

        {/* 2. 차트 모양 선택 */}
        <label>
          모양:
          <select onChange={(e) => onTypeChange(e.target.value)} style={{ marginLeft: '5px' }}>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
            <option value="scatter">Scatter</option>
          </select>
        </label>
      </div>
    </header>
  );
};

export default Header;
