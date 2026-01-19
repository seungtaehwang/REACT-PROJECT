// DieGenerator.js

import { color } from "echarts";

// Wafer Die Data Generator for Cartesian coordinates
export const generateDies = (params) => {
  const dies = [];
  const validRadian = (params.waferSize - 2.0 * params.waferEdge) / 2.0; // Wafer radius in data units
  const diexLen =
    (params.waferSize - 2.0 * params.waferEdge) /
    (params.dieSizeX + params.scribeSize);
  const diexDum =
    (params.waferSize - 2.0 * params.waferEdge) %
    (params.dieSizeX + params.scribeSize);
  const dieyLen =
    (params.waferSize - 2.0 * params.waferEdge) /
    (params.dieSizeY + params.scribeSize);
  const dieyDum =
    (params.waferSize - 2.0 * params.waferEdge) %
    (params.dieSizeY + params.scribeSize);

  for (let ix = 0; ix < diexLen; ix++) {
    for (let iy = 0; iy < dieyLen; iy++) {
      const xPos =
        -validRadian +
        diexDum / 2.0 +
        ix * (params.dieSizeX + params.scribeSize);
      const yPos =
        -validRadian +
        dieyDum / 2.0 +
        iy * (params.dieSizeY + params.scribeSize);
      var valid = false;
      if (xPos < 0.0 && yPos < 0.0) {
        valid = Math.sqrt(xPos ** 2 + yPos ** 2) <= validRadian;
      }

      if (xPos >= 0.0 && yPos >= 0.0) {
        valid =
          Math.sqrt(
            (xPos + params.dieSizeX) ** 2 + (yPos + params.dieSizeY) ** 2,
          ) <= validRadian;
      }

      if (xPos < 0.0 && yPos >= 0.0) {
        valid =
          Math.sqrt(xPos ** 2 + (yPos + params.dieSizeY) ** 2) <= validRadian;
      }

      if (xPos >= 0 && yPos < 0) {
        valid =
          Math.sqrt((xPos + params.dieSizeX) ** 2 + yPos ** 2) <= validRadian;
      }

      if (valid) {
        if (params.mapType === "EDS") {
          const binNumber = Math.floor(Math.random() * 5) + 1;
          let status = "Good";
          if (binNumber > 3) status = "Fail";

          dies.push({
            id: `D${ix}-${iy}`,
            x: xPos,
            y: yPos,
            width: params.dieSizeX,
            height: params.dieSizeY,
            bin: binNumber,
            status: status,
          });
        } else if (params.mapType === "MEASURE") {
          const itemValue = Math.floor(Math.random() * (100 - 60 + 1) + 60);
          let status = "Good";

          if (itemValue < 75) status = "Fail";

          dies.push({
            id: `D${ix}-${iy}`,
            x: xPos,
            y: yPos,
            width: params.dieSizeX,
            height: params.dieSizeY,
            itemValue: itemValue,
            status: status,
          });
        } else if (params.mapType === "DEFECT") {
          dies.push({
            id: `D${ix}-${iy}`,
            x: xPos,
            y: yPos,
            width: params.dieSizeX,
            height: params.dieSizeY,
          });
        } else if (params.mapType === "METRO-CD") {
          const itemValue = Math.floor(Math.random() * (100 - 60 + 1) + 60);
          dies.push({
            id: `D${ix}-${iy}`,
            x: xPos,
            y: yPos,
            width: params.dieSizeX,
            height: params.dieSizeY,
            itemValue: itemValue,
          });
        }
      }
    }
  }
  return dies;
};
