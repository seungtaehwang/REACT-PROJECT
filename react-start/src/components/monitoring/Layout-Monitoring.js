import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchSelector from '../controls/MultiSelector';

const LayoutMonitoring = () => {
  const [options, setOptions] = useState({ processList: [], equipList: [] });
  const [filterInput, setFilterInput] = useState({ process: '', equip: '' });
  const [searchParams, setSearchParams] = useState({ processes: [], equips: [] });

  const buttonStyle = {
    width: '100px', // 요청하신 200px 사이즈
    padding: '12px 0',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    textAlign: 'center',
    whiteSpace: 'nowrap', // 텍스트가 버튼 밖으로 나가지 않게 함
  };

  // 1. 필터 입력값 업데이트
  const handleFilterChange = (category, value) => {
    setFilterInput((prev) => ({ ...prev, [category]: value }));
  };

  // 2. 서버에서 데이터 조회 (Spring API)
  const fetchOptions = async (category) => {
    try {
      const keyword = filterInput[category];
      const res = await axios.get(`http://localhost:8080/map/options`, {
        params: { type: category, keyword: keyword },
      });

      const targetList = category === 'process' ? 'processList' : 'equipList';
      setOptions((prev) => ({ ...prev, [targetList]: res.data }));
    } catch (err) {
      console.error('데이터 로드 실패:', err);
    }
  };

  // 3. 멀티 셀렉트 변경 핸들러 (기존 로직 유지)
  const handleMultiChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selectedValues.push(options[i].value);
    }
    // 컴포넌트 name 속성에 따라 processes 또는 equips 배열 업데이트
    const targetKey = name === 'process' ? 'processes' : 'equips';
    setSearchParams((prev) => ({ ...prev, [targetKey]: selectedValues }));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>반도체 통합 조회 시스템</h2>
      <hr />

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 공정 선택기 */}
        <SearchSelector
          label="공정"
          category="process"
          filterValue={filterInput.process}
          onFilterChange={handleFilterChange}
          onFetch={fetchOptions}
          options={options.processList}
          selectedValues={searchParams.processes}
          onSelectChange={handleMultiChange}
        />

        {/* 설비 선택기 */}
        <SearchSelector
          label="설비"
          category="equip"
          filterValue={filterInput.equip}
          onFilterChange={handleFilterChange}
          onFetch={fetchOptions}
          options={options.equipList}
          selectedValues={searchParams.equips}
          onSelectChange={handleMultiChange}
        />
        {/* 설비 선택기 */}
        <SearchSelector
          label="설비1"
          category="equip1"
          filterValue={filterInput.equip}
          onFilterChange={handleFilterChange}
          onFetch={fetchOptions}
          options={options.equipList}
          selectedValues={searchParams.equips}
          onSelectChange={handleMultiChange}
        />
        {/* 설비 선택기 */}
        <SearchSelector
          label="설비2"
          category="equip2"
          filterValue={filterInput.equip}
          onFilterChange={handleFilterChange}
          onFetch={fetchOptions}
          options={options.equipList}
          selectedValues={searchParams.equips}
          onSelectChange={handleMultiChange}
        />
      </div>

      <div style={{ display: 'flex', marginTop: '10px', gap: '20px' }}>
        {/* 공정 선택기 */}
        <SearchSelector
          label="공정"
          category="process"
          filterValue={filterInput.process}
          onFilterChange={handleFilterChange}
          onFetch={fetchOptions}
          options={options.processList}
          selectedValues={searchParams.processes}
          onSelectChange={handleMultiChange}
        />

        {/* 설비 선택기 */}
        <SearchSelector
          label="설비"
          category="equip"
          filterValue={filterInput.equip}
          onFilterChange={handleFilterChange}
          onFetch={fetchOptions}
          options={options.equipList}
          selectedValues={searchParams.equips}
          onSelectChange={handleMultiChange}
        />
        {/* 설비 선택기 */}
        <SearchSelector
          label="설비1"
          category="equip1"
          filterValue={filterInput.equip}
          onFilterChange={handleFilterChange}
          onFetch={fetchOptions}
          options={options.equipList}
          selectedValues={searchParams.equips}
          onSelectChange={handleMultiChange}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end', // 모든 요소를 우측으로 밀기
          alignItems: 'center',
          gap: '10px', // 버튼 사이 간격
          marginTop: '20px',
          width: '100%',
        }}
      >
        {/* 각 버튼의 너비를 200px로 고정하고 수평 배치 */}
        <button style={buttonStyle} onClick={() => console.log('실행1')}>
          Add
        </button>
        <button style={buttonStyle} onClick={() => console.log('실행2')}>
          Remove
        </button>
        <button style={buttonStyle} onClick={() => console.log('실행3')}>
          Save
        </button>
        <button style={buttonStyle} onClick={() => console.log('실행4')}>
          Run
        </button>
      </div>
    </div>
  );
};

export default LayoutMonitoring;
