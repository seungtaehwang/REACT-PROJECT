import React, { useState } from 'react';
import Header from './Header'
import MapHeader from './components/map/MapHeader';
import MapLayout from './components/map/MapLayout';
import ChartHeader from './components/chart/ChartHeader';
import ChartLayout from './components/chart/ChartLayout';

function App() {
  const [galleryType, setGalleryType] = useState('Map');
  const [dataSelection, setDataSelection] = useState('기본');
  const [library, setLibrary] = useState('echarts');            // eChart or Chart.js
  const [chartType, setChartType] = useState('bar');
  const [cols, setColumnCount] = useState(10);                  // Chart Count

  // 1. 실제 드로잉에 사용될 파라미터 상태
  const [drawParams, setDrawParams] = useState(null);

  // 2. Header에서 Draw 버튼 클릭 시 호출될 함수
  const handleDraw = (params) => {
    setDrawParams(params);
  };

  return (
    <div>
      <Header 
        onGalleryType={setGalleryType} 
      />
      {galleryType === 'Map' ? (
        <>
          <MapHeader onDraw={handleDraw} />
          <hr />
          {/* 파라미터가 있을 때만 레이아웃 렌더링 */}
          {drawParams && <MapLayout params={drawParams} />}
        </>
      ) : (
        <>
          <ChartHeader 
            onDataSelect={setDataSelection} 
            onTypeChange={setChartType} 
            onLibraryChange={setLibrary} 
            onColumnCountChange={setColumnCount} 
          />
          <div style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>
            <strong>설정:</strong> {dataSelection} | {chartType.toUpperCase()} | {library === 'echarts' ? 'ECharts' : 'Chart.js'}
          </div>
          <ChartLayout 
            selectedData={dataSelection} 
            chartType={chartType} 
            library={library}
            cols={cols} 
          />
        </>
      )}
    </div>
  );
}

export default App;