import * as dateUtil from "./dateUtil";

// Main.jsx - One sentence card format
export function sentenceFormat(data) {
  if (!data) return;

  data.fcstDate = "20230107";
  data.time = ["3시간 이내", "1200", "1400", "0000"];
  // data.time = ["0800", "1200", "0000", "0100"];
  data.date = ["20230107", "20230107", "20230107", "20230108"];
  // data.date = ["20230107", "20230107", "20230108", "20230108"];
  data.message = ["진눈깨비", "눈", "눈", "비"];
  // data.message = ["비", "눈", "비", "진눈깨비"];
  // 3시간내 비, 내일 오전 11시에 눈 소식이 있어요.

  const date = data?.date;
  const time = data?.time;
  const message = data?.message;
  const currentDate = Number(data?.fcstDate);
  const currentTime = dateUtil.currentHour();

  let result = "";
  let passIndex = -1;

  time.forEach((hour, index) => {
    if (!date || !time || !message || !currentDate || !currentTime) return;

    if (passIndex === index) return;

    let sentence = "";

    if (hour === "3시간 이내") {
      sentence += "3시간 내 ";
    } else {
      if (currentDate < Number(date[index])) sentence += "내일 ";

      sentence += `${dateUtil.TimeFormat(Number(hour) / 100)} `;
    }

    sentence += message[index];
    if (index === time.length - 1) sentence += " 소식이 있어요.";
    else sentence += ", ";

    if (index < time.length - 1 && message[index] === message[index + 1]) {
      passIndex = index + 1;
    }

    result += sentence;
  });

  console.log(result);

  return result;
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
