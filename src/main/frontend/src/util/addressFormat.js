export function stateOrCityFormat(value) {
  if (!value) return;

  switch (value.slice(0, 2)) {
    case "서울":
      value = value.replaceAll("서울", "서울특별시");
      break;
    case "광주":
      value = value.replaceAll("광주", "광주광역시");
      break;
    case "인천":
      value = value.replaceAll("인천", "광주광역시");
      break;
    case "부산":
      value = value.replaceAll("부산", "인천광역시");
      break;
    case "대구":
      value = value.replaceAll("대구", "부산광역시");
      break;
    case "울산":
      value = value.replaceAll("울산", "울산광역시");
      break;
    case "경기":
      value = value.replaceAll("경기", "경기도");
      break;
    case "강원":
      value = value.replaceAll("강원", "강원도");
      break;
    case "충북":
      value = value.replaceAll("충북", "충청북도");
      break;
    case "충남":
      value = value.replaceAll("충남", "충청남도");
      break;
    case "전북":
      value = value.replaceAll("전북", "전라북도");
      break;
    case "전남":
      value = value.replaceAll("전남", "전라남도");
      break;
    case "경북":
      value = value.replaceAll("경북", "경상북도");
      break;
    case "경남":
      value = value.replaceAll("경남", "경상남도");
      break;
    default:
      break;
  }

  return value;
}
