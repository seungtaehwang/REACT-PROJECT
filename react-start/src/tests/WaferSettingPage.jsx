import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. 초기 기본값 설정
const INITIAL_BIN_COLORS = [
  { id: 1, label: 'Pass', color: '#10b981' },
  { id: 2, label: 'Functional Fail', color: '#f59e0b' },
  { id: 3, label: 'Parametric Fail', color: '#ef4444' },
  { id: 4, label: 'Edge Fail', color: '#de58eb' },
  { id: 5, label: 'Cluster Fail', color: '#E67E22' },
];

const USER_ID = 'miyoung.id'; // 실제 앱에서는 로그인 세션에서 가져옴

const WaferSettingPage = () => {
  const [binColors, setBinColors] = useState(INITIAL_BIN_COLORS);
  const [loading, setLoading] = useState(true);

  // 2. 서버에서 사용자의 커스텀 색상 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/wafer-settings/${USER_ID}`)
      .then((res) => {
        // DB에 저장된 colorConfig 문자열이 있다면 파싱하여 상태 업데이트
        if (res.data && res.data.colorConfig) {
          setBinColors(JSON.parse(res.data.colorConfig));
        }
      })
      .catch((err) => console.error('데이터 로드 중 오류:', err))
      .finally(() => setLoading(false));
  }, []);

  // 3. 색상 변경 이벤트 핸들러
  const handleColorChange = (id, newColor) => {
    setBinColors((prev) =>
      prev.map((item) => (item.id === id ? { ...item, color: newColor } : item)),
    );
  };

  // 4. DB에 현재 설정 저장하기
  const saveSettings = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/wafer-settings/${USER_ID}`,
        JSON.stringify(binColors), // 배열 전체를 JSON 문자열로 변환
        { headers: { 'Content-Type': 'application/json' } },
      );
      alert('성공적으로 저장되었습니다!');
    } catch (err) {
      alert('저장에 실패했습니다.');
      console.error(err);
    }
  };

  if (loading) return <div>설정을 불러오는 중...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>사용자 맞춤형 웨이퍼 빈 컬러 설정</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {binColors.map((bin) => (
          <div key={bin.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ width: '180px' }}>
              {bin.label} (ID: {bin.id})
            </span>
            <input
              type="color"
              value={bin.color}
              onChange={(e) => handleColorChange(bin.id, e.target.value)}
              style={{ cursor: 'pointer', border: 'none', width: '40px', height: '40px' }}
            />
            <span>{bin.color.toUpperCase()}</span>
          </div>
        ))}
      </div>
      <button
        onClick={saveSettings}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        설정 저장하기 (SQLite)
      </button>
    </div>
  );
};

export default WaferSettingPage;
