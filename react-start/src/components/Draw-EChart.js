import React from 'react';
import ReactECharts from 'echarts-for-react';

function DrawEChart(props) {

  // 2. ECharts 옵션 설정
  const getOption = () => ({
    title: { text: props.title },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: props.data.categories
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '수치',
        type: props.type,
        data: props.data.values,
        itemStyle: { color: '#5470c6' }
      }
    ]
  });    
    return (
        <>
            <ReactECharts
                option={getOption()}
                style={{ height: '400px', width: '100%' }}
            />
        </>
    );
}   

export default DrawEChart;

