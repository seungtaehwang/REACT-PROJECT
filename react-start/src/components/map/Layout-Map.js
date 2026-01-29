import { useState } from 'react';
import HeaderMap from './Header-Map';
import GalleryGen from './Gallery-Gen';
import GalleryApi from './Gallery-Api';

function LayoutMap() {
  const [dataType, setDataType] = useState('Api');
  const [waferInfo, setWaferInfo] = useState('Information...');
  // 1. 실제 드로잉에 사용될 파라미터 상태
  const [drawParams, setDrawParams] = useState(null);

  // 2. Header에서 Draw 버튼 클릭 시 호출될 함수
  const handleDraw = (params) => {
    setDrawParams(params);
  };

  return (
    <div>
      <HeaderMap onDraw={handleDraw} onDataType={setDataType} />
      <p style={{ marginLeft: '10px', fontSize: '12px', color: '#443f3f' }}>{waferInfo}</p>
      <hr />
      {/* 파라미터가 있을 때만 레이아웃 렌더링 */}
      {dataType === 'Api' ? (
        <>{drawParams && <GalleryApi params={drawParams} onInfoUpdate={setWaferInfo} />}</>
      ) : (
        <>{drawParams && <GalleryGen params={drawParams} />}</>
      )}{' '}
    </div>
  );
}

export default LayoutMap;
