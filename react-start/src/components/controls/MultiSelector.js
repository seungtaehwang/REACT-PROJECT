import React from 'react';

const SearchSelector = ({
  label,
  category,
  filterValue,
  onFilterChange,
  onFetch,
  options,
  selectedValues,
  onSelectChange,
}) => {
  return (
    <div style={{ flex: 1 }}>
      {/* 상단 라벨 및 필터 영역 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
        <label style={{ fontWeight: 'bold', minWidth: '40px' }}>{label}</label>
        <input
          type="text"
          style={{ width: '100%' }}
          placeholder="필터..."
          value={filterValue}
          onChange={(e) => onFilterChange(category, e.target.value)}
        />
        <button style={{ width: '60px' }} onClick={() => onFetch(category)}>
          조회
        </button>
      </div>

      {/* 멀티 선택 리스트 (기존 기능 유지) */}
      <select
        name={category}
        multiple
        value={selectedValues}
        onChange={onSelectChange}
        style={{ width: '100%', height: '150px' }}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>
        {selectedValues.length}개 선택됨
      </div>
    </div>
  );
};

export default SearchSelector;
