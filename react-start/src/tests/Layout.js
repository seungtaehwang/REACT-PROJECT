import React from "react";
import DefectWaferMap from "./DefectWaferMap"; // 가상의 맵 컴포넌트

const Layout = ({ columnCount }) => {
  // 6개의 웨이퍼 맵 데이터 시뮬레이션
  const waferData = Array.from({ length: 6 }, (_, i) => ({ id: i + 1 }));

  const containerStyle = {
    display: "grid",
    // 사용자가 선택한 columnCount에 따라 그리드 열 개수 변경
    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
    gap: "20px",
    padding: "20px",
    justifyItems: "center",
  };

  return (
    <div style={containerStyle}>
      {waferData.map((data) => (
        <div
          key={data.id}
          style={{
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "white",
            padding: "10px",
          }}
        >
          <h5 style={{ textAlign: "center", margin: "0 0 10px 0" }}>
            Wafer #{data.id}
          </h5>
          <DefectWaferMap id={data.id} />
        </div>
      ))}
    </div>
  );
};

export default Layout;
