// DieGenerator.js

// Wafer Die Data Generator for Cartesian coordinates
export const generateDies = (params) => {
  const dies = [];
  const validRadian = (params.waferSize - 2.0 * params.waferEdge) / 2.0; // Wafer radius in data units
  const diexLen =
    (params.waferSize - 2.0 * params.waferEdge) / (params.dieSizeX + params.scribeSize);
  const diexDum =
    (params.waferSize - 2.0 * params.waferEdge) % (params.dieSizeX + params.scribeSize);
  const dieyLen =
    (params.waferSize - 2.0 * params.waferEdge) / (params.dieSizeY + params.scribeSize);
  const dieyDum =
    (params.waferSize - 2.0 * params.waferEdge) % (params.dieSizeY + params.scribeSize);

  for (let ix = 0; ix < diexLen; ix++) {
    for (let iy = 0; iy < dieyLen; iy++) {
      const xPos = -validRadian + diexDum / 2.0 + ix * (params.dieSizeX + params.scribeSize);
      const yPos = -validRadian + dieyDum / 2.0 + iy * (params.dieSizeY + params.scribeSize);
      var valid = false;
      if (xPos < 0.0 && yPos < 0.0) {
        valid = Math.sqrt(xPos ** 2 + yPos ** 2) <= validRadian;
      }

      if (xPos >= 0.0 && yPos >= 0.0) {
        valid =
          Math.sqrt((xPos + params.dieSizeX) ** 2 + (yPos + params.dieSizeY) ** 2) <= validRadian;
      }

      if (xPos < 0.0 && yPos >= 0.0) {
        valid = Math.sqrt(xPos ** 2 + (yPos + params.dieSizeY) ** 2) <= validRadian;
      }

      if (xPos >= 0 && yPos < 0) {
        valid = Math.sqrt((xPos + params.dieSizeX) ** 2 + yPos ** 2) <= validRadian;
      }

      if (valid) {
        if (params.mapType === 'EDS') {
          const binNumber = Math.floor(Math.random() * 5) + 1;
          let status = 'Good';
          if (binNumber > 3) status = 'Fail';

          dies.push({
            id: `D${ix}-${iy}`,
            x: xPos,
            y: yPos,
            width: params.dieSizeX,
            height: params.dieSizeY,
            bin: binNumber,
            status: status,
          });
        } else if (params.mapType === 'MEASURE') {
          const itemValue = Math.floor(Math.random() * (100 - 60 + 1) + 60);
          let status = 'Good';

          if (itemValue < 75) status = 'Fail';

          dies.push({
            id: `D${ix}-${iy}`,
            x: xPos,
            y: yPos,
            width: params.dieSizeX,
            height: params.dieSizeY,
            itemValue: itemValue,
            status: status,
          });
        } else if (params.mapType === 'DEFECT') {
          dies.push({
            id: `D${ix}-${iy}`,
            x: xPos,
            y: yPos,
            width: params.dieSizeX,
            height: params.dieSizeY,
          });
        } else if (params.mapType === 'METRO-CD') {
          dies.push({
            id: `D${ix}-${iy}`,
            x: xPos,
            y: yPos,
            width: params.dieSizeX,
            height: params.dieSizeY,
          });
        }
      }
    }
  }
  return dies;
};

export const generateMetroCD = (params, cdCount) => {
  const cds = [];

  // 1. Wafer 유효 Range 구한다.
  let range = (params.waferSize - 2 * params.waferEdge) / 2; // Wafer radius in data units

  for (let i = 0; i < cdCount; i++) {
    const min = -range;
    const max = range;
    const x = Math.floor(Math.random() * (max - min + 1)) + min;
    const y = Math.floor(Math.random() * (max - min + 1)) + min;
    const cdValue = Math.floor(Math.random() * (100 - 60 + 1) + 60);
    if (Math.sqrt(x * x + y * y) < range) {
      cds.push({
        id: `R${i}`,
        x,
        y,
        cdValue: cdValue,
      }); // Yellow
    }
  }

  return cds;
};

// startColor, EndColor를 Step수 나누어서 Gradient Color List 반환한다.
export const generateGradient = (start, end, steps) => {
  // HEX를 RGB 객체로 변환하는 헬퍼 함수
  const hexToRgb = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
  };

  // RGB를 HEX로 변환하는 헬퍼 함수
  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
  };

  const startRgb = hexToRgb(start);
  const endRgb = hexToRgb(end);
  const colors = [];

  for (let i = 0; i < steps; i++) {
    // 0에서 1 사이의 비율 계산
    const factor = i / (steps - 1);

    const r = startRgb.r + factor * (endRgb.r - startRgb.r);
    const g = startRgb.g + factor * (endRgb.g - startRgb.g);
    const b = startRgb.b + factor * (endRgb.b - startRgb.b);

    colors.push(rgbToHex(r, g, b));
  }

  return colors;
};
