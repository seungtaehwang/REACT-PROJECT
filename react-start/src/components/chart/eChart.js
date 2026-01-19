import React, { useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const EChart = ({ title, data, type }) => {
    // 데이터 가공 (Pie 차트의 경우 특정 형식 필요)
    const formattedData = type === 'pie' 
        ? data.map((val, i) => ({ value: val, name: `항목${i+1}` }))
        : data;
    const chartRef = useRef(null); // 차트 인스턴스 참조를 위한 ref

    // 데이터나 타입이 바뀔 때 명시적으로 clear를 호출하고 싶을 경우 (선택 사항)
    useEffect(() => {
        if (chartRef.current) {
        const chartInstance = chartRef.current.getEchartsInstance();
        }
    }, [data, type]);

    const getOption = () => {
        // 기본 공통 설정
        const baseOption = {
        title: { text: title, left: 'center' },
        tooltip: { trigger: type === 'pie' ? 'item' : 'axis' },
        };

        // 타입별 특화 설정
        const typeOptions = {
        bar: {
            xAxis: { type: 'category', data: ['월', '화', '수', '목', '금'] },
            yAxis: { type: 'value' },
            series: [{ data: formattedData, type: 'bar' }]
        },
        line: {
            xAxis: { type: 'category', data: ['월', '화', '수', '목', '금'] },
            yAxis: { type: 'value' },
            series: [{ data: formattedData, type: 'line', smooth: false }]
        },
        pie: {
            series: [{
            type: 'pie',
            radius: '50%',
            data: formattedData,
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
            }]
        },
        scatter: {
            xAxis: {},
            yAxis: {},
            series: [{
            symbolSize: 10,
            // 산점도는 [x, y] 형태의 데이터가 필요하므로 가공
            data: data.map((val, i) => [i, val]),
            type: 'scatter'
            }]
        }
        };

        return { ...baseOption, ...typeOptions[type] };
  };

    return (
        <div style={{ position: 'relative' }}>
        {/* 테스트를 위해 수동 클리어 버튼을 넣을 수 있습니다 */}
        <button 
            onClick={() => chartRef.current.getEchartsInstance().clear()}
            style={{ position: 'absolute', right: 5, top: 5, zIndex: 10, fontSize: '10px' }}
        >
            Clear
        </button>

        <ReactECharts 
            ref={chartRef} // ref 연결
            option={getOption()} 
            notMerge={true} 
            style={{ height: '280px', width: '100%' }} 
        />
        </div>
    );
};

export default EChart;