import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

// --- 샘플 데이터 ---
const data = [
  { name: 'A', uv: 400, pv: 240, amt: 240 },
  { name: 'B', uv: 300, pv: 456, amt: 200 },
  { name: 'C', uv: 200, pv: 980, amt: 229 },
  { name: 'D', uv: 278, pv: 390, amt: 200 },
  { name: 'E', uv: 189, pv: 480, amt: 218 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// --- 1. 차트 렌더링 콤포넌트 ---
const ChartItem = ({ type }) => {
  return (
    <div
      style={{
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h4 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>{type.toUpperCase()} Chart</h4>
      <ResponsiveContainer width="100%" height="90%">
        {type === 'bar' && (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
          </BarChart>
        )}
        {type === 'line' && (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        )}
        {type === 'scatter' && (
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="uv" name="stature" />
            <YAxis type="number" dataKey="pv" name="weight" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={data} fill="#8884d8" />
          </ScatterChart>
        )}
        {type === 'pie' && (
          <PieChart>
            <Pie
              data={data}
              dataKey="uv"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
        {type === 'boxplot' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#999',
            }}
          >
            Boxplot은 Recharts에서 직접 지원하지 않아 커스텀 구성이 필요합니다.
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

// --- 2. 메인 App 컴포넌트 ---
const App = () => {
  // 상태 관리: Header에서 선택한 값들을 Draw 버튼 클릭 시 Layout으로 전송
  const [config, setConfig] = useState({ type: 'bar', count: 3 });
  const [activeConfig, setActiveConfig] = useState({ type: 'bar', count: 3 });

  const handleDraw = () => {
    setActiveConfig({ ...config });
  };

  const styles = {
    app: { display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' },
    header: {
      height: '60px',
      backgroundColor: '#2c3e50',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: '20px',
    },
    layout: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#ecf0f1',
      overflowY: 'auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // 3열 배치
      gap: '20px',
      alignContent: 'start',
    },
    select: { padding: '5px 10px', borderRadius: '4px' },
    button: {
      padding: '6px 20px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.app}>
      {/* Header 영역 */}
      <header style={styles.header}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Chart Dashboard</h2>

        <label>Type:</label>
        <select
          style={styles.select}
          value={config.type}
          onChange={(e) => setConfig({ ...config, type: e.target.value })}
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="scatter">Scatter</option>
          <option value="pie">Pie</option>
          <option value="boxplot">BoxPlot</option>
        </select>

        <label>Count:</label>
        <select
          style={styles.select}
          value={config.count}
          onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6, 9, 12].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <button style={styles.button} onClick={handleDraw}>
          Draw
        </button>
      </header>

      {/* Layout 영역 (3열 배치) */}
      <main style={styles.layout}>
        {Array.from({ length: activeConfig.count }).map((_, i) => (
          <ChartItem key={i} type={activeConfig.type} />
        ))}
      </main>
    </div>
  );
};

export default App;
