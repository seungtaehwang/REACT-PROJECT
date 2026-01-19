import React from "react";
import EChart from "./eChart";
import Chartjs from "./Chartjs";

const Layout = ({ selectedData, library, chartType, cols }) => {
  // 9개의 데이터 생성
  const chartItems = Array.from({ length: cols }, (_, i) => ({
    id: i,
    title: `그래프 ${i + 1}`,
    values: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
  }));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // 3x3 레이아웃
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {chartItems.map((item) => (
        <div
          key={item.id}
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {/* 라이브러리 선택 인자에 따른 조건부 렌더링 */}
          {library === "echarts" ? (
            <EChart
              title={`${selectedData} (EC) - ${item.title}`}
              data={item.values}
              type={chartType}
            />
          ) : (
            <Chartjs
              title={`${selectedData} (CJS) - ${item.title}`}
              data={item.values}
              type={chartType}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Layout;
