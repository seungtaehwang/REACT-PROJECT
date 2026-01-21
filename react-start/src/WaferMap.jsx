import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

const WaferMap = () => {
  const WAFER_SIZE = 300000;
  const RADIUS = WAFER_SIZE / 2;
  const SHOT_SIZE = 30000;
  const DIE_SIZE = 10000;

  const option = useMemo(() => {
    const shots = [];
    const dies = [];
    const defects = [];

    // 1. Die 및 Shot 데이터 생성
    for (let x = -RADIUS; x < RADIUS; x += DIE_SIZE) {
      for (let y = -RADIUS; y < RADIUS; y += DIE_SIZE) {
        // Die의 중심이 웨이퍼 반경 안에 있는지 확인
        if (Math.sqrt(Math.pow(x + DIE_SIZE / 2, 2) + Math.pow(y + DIE_SIZE / 2, 2)) < RADIUS) {
          dies.push([x, y, DIE_SIZE, DIE_SIZE]);
          // Shot 경계 (30mm 단위)
          if (x % SHOT_SIZE === 0 && y % SHOT_SIZE === 0) {
            shots.push([x, y, SHOT_SIZE, SHOT_SIZE]);
          }
        }
      }
    }

    // 2. 랜덤 Defect 데이터 생성 (150개)
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * RADIUS;
      defects.push([r * Math.cos(angle), r * Math.sin(angle), Math.random() * 20]);
    }

    return {
      title: { text: 'React ECharts Wafer Map (300mm)', left: 'center' },
      tooltip: { trigger: 'item' },
      // 줌(Zoom) 기능 추가
      dataZoom: [{ type: 'inside' }, { type: 'slider', bottom: 10 }],
      xAxis: { type: 'value', min: -160000, max: 160000, splitLine: { show: false } },
      yAxis: { type: 'value', min: -160000, max: 160000, splitLine: { show: false } },
      series: [
        {
          name: 'Die',
          type: 'custom',
          renderItem: (params, api) => {
            const coords = api.coord([api.value(0), api.value(1)]);
            const size = api.size([api.value(2), api.value(3)]);
            return {
              type: 'rect',
              shape: { x: coords[0], y: coords[1] - size[1], width: size[0], height: size[1] },
              style: { fill: 'rgba(200,200,200,0.1)', stroke: '#ddd', lineWidth: 0.5 },
            };
          },
          data: dies,
        },
        {
          name: 'Wafer',
          type: 'custom',
          silent: true,
          renderItem: (params, api) => {
            const center = api.coord([0, 0]);
            const rx = api.size([RADIUS, 0])[0];
            return {
              type: 'circle',
              shape: { cx: center[0], cy: center[1], r: rx },
              style: { fill: 'transparent', stroke: '#333', lineWidth: 2 },
            };
          },
          data: [[0, 0]],
        },
        {
          name: 'Defect',
          type: 'scatter',
          coordinateSystem: 'cartesian2d',
          symbolSize: (data) => Math.max(5, data[2] / 2),
          itemStyle: { color: 'red', opacity: 0.8 },
          data: defects,
        },
      ],
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <ReactECharts option={option} style={{ height: '800px', width: '900px' }} />
    </div>
  );
};

export default WaferMap;
