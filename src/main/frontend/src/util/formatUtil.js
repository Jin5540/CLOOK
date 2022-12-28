// Main.jsx 1 sentence card format
export function sentenceFormat(value) {
  if (!value) return;

  const hour = Number(value) / 100;

  if (hour === 0) {
    return "현재 ";
  } else {
    return `${hour}시간 뒤에 `;
  }
}

// Change the name of a "state or city"
export function stateOrCityFormat(value) {
  if (!value) return;

  switch (value.slice(0, 2)) {
    case "서울":
      if (!value.includes("서울특별시")) {
        value = value.replaceAll("서울", "서울특별시");
      }
      break;
    case "광주":
      if (!value.includes("광주광역시")) {
        value = value.replaceAll("광주", "광주광역시");
      }
      break;
    case "인천":
      if (!value.includes("인천광역시")) {
        value = value.replaceAll("인천", "인천광역시");
      }
      break;
    case "부산":
      if (!value.includes("부산광역시")) {
        value = value.replaceAll("부산", "부산광역시");
      }
      break;
    case "대구":
      if (!value.includes("대구광역시")) {
        value = value.replaceAll("대구", "대구광역시");
      }
      break;
    case "울산":
      if (!value.includes("울산광역시")) {
        value = value.replaceAll("울산", "울산광역시");
      }
      break;
    case "경기":
      if (!value.includes("경기도")) {
        value = value.replaceAll("경기", "경기도");
      }
      break;
    case "강원":
      if (!value.includes("강원도")) {
        value = value.replaceAll("강원", "강원도");
      }
      break;
    case "충북":
      if (!value.includes("충청북도")) {
        value = value.replaceAll("충북", "충청북도");
      }
      break;
    case "충남":
      if (!value.includes("충청남도")) {
        value = value.replaceAll("충남", "충청남도");
      }
      break;
    case "전북":
      if (!value.includes("전라북도")) {
        value = value.replaceAll("전북", "전라북도");
      }
      break;
    case "전남":
      if (!value.includes("전라남도")) {
        value = value.replaceAll("전남", "전라남도");
      }
      break;
    case "경북":
      if (!value.includes("경상북도")) {
        value = value.replaceAll("경북", "경상북도");
      }
      break;
    case "경남":
      if (!value.includes("경상남도")) {
        value = value.replaceAll("경남", "경상남도");
      }
      break;
    default:
      break;
  }

  return value;
}
