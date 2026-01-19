import { ValueType } from "realgrid";
export const fields = [
  {
    fieldName: "KorName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "Age",
    dataType: ValueType.NUMBER,
  },
  ];

export const columns = [
  {
    name: "KorName",
    fieldName: "KorName",
    header: {
      text: "이름",
      styleName: "orange-column",
    },
    width: "200",
    // editable: false,
  },
  {
    name: "Monetary",
    fieldName: "Monetary",
    width: "200",
    header: {
      text: "통화",
    },
    styleName: "left-column",
  },
  {
    name: "Gender",
    fieldName: "Gender",
    width: "40",
    header: {
      text: "성별",
    },
  },
  ];
