import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";

// Chart.js에 필요한 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const Chartjs = ({ title, data, type }) => {
  const labels = ["월", "화", "수", "목", "금"];

  // 공통 옵션 설정
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
    },
  };

  // 데이터셋 구성
  const chartData = {
    labels: type === "scatter" ? [] : labels,
    datasets: [
      {
        label: title,
        data:
          type === "scatter"
            ? data.map((val, i) => ({ x: i, y: val })) // Scatter 전용 형식
            : data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 타입에 따른 컴포넌트 매핑
  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line options={options} data={chartData} />;
      case "pie":
        return <Pie options={options} data={chartData} />;
      case "scatter":
        return <Scatter options={options} data={chartData} />;
      case "bar":
      default:
        return <Bar options={options} data={chartData} />;
    }
  };

  return <div style={{ height: "280px", width: "100%" }}>{renderChart()}</div>;
};

export default Chartjs;
