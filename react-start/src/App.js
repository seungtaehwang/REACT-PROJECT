import { useState } from 'react';
import './App.css';
import Header from './Header';
import ChartHeader from './components/chart/ChartHeader';
import ChartLayout from './components/chart/ChartLayout';
import MapHeader from './components/map/Header-Map';
import MapLayout from './components/map/Gallery-Gen';
import MapApiLayout from './components/map/Gallery-Api';

function App() {
  const [galleryType, setGalleryType] = useState('Map');
  const [dataSelection, setDataSelection] = useState('기본');
  const [library, setLibrary] = useState('echarts'); // eChart or Chart.js
  const [chartType, setChartType] = useState('bar');
  const [cols, setColumnCount] = useState(10); // Chart Count
  const [waferInfo, setWaferInfo] = useState('Information...');
  // 1. 실제 드로잉에 사용될 파라미터 상태
  const [drawParams, setDrawParams] = useState(null);

  // 2. Header에서 Draw 버튼 클릭 시 호출될 함수
  const handleDraw = (params) => {
    setDrawParams(params);
  };

  return (
    <div>
      <Header className="Top-header" onGalleryType={setGalleryType} />
      {galleryType === 'Map' || galleryType === 'Map-Api' ? (
        <>
          <MapHeader onDraw={handleDraw} title={galleryType} />
          <p style={{ marginLeft: '10px', fontSize: '12px', color: '#443f3f' }}>{waferInfo}</p>
          <hr />

          {/* 파라미터가 있을 때만 레이아웃 렌더링 */}
          {galleryType === 'Map' ? (
            <>{drawParams && <MapLayout params={drawParams} />}</>
          ) : (
            <>{drawParams && <MapApiLayout params={drawParams} onInfoUpdate={setWaferInfo} />}</>
          )}
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
            <strong>설정:</strong> {dataSelection} | {chartType.toUpperCase()} |{' '}
            {library === 'echarts' ? 'ECharts' : 'Chart.js'}
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
