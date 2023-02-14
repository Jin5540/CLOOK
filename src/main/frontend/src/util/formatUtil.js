import * as dateUtil from "./dateUtil";

function sentenceSort(data) {
  const sortData = [];

  data.time?.forEach((hour, index) => {
    const arr = [
      hour === "3시간 이내" ? -3 : Number(hour) / 100,
      Number(data.date[index]),
      data.message[index],
    ];
    sortData.push(arr);
  });

  sortData.sort((a, b) => {
    if (a[0] > b[0]) {
      if (a[1] > b[1]) return 1;
      else if (a[1] < b[1]) return -1;
      else return 1;
    } else if (a[0] < b[0]) {
      if (a[1] < b[1]) return -1;
      else if (a[1] > b[1]) return 1;
      else return -1;
    } else {
      if (a[1] < b[1]) return -1;
      else if (a[1] > b[1]) return 1;
      else return 0;
    }
  });

  return sortData;
}

function dupleDataSort(data) {
  const resultArr = [];
  let message = "";
  data
    .filter((value) => value[0] === -3)
    .forEach((item, index, arr) => {
      //
      if (index < arr.length - 1) {
        message += `${item[2]}·`;
      } else {
        message += item[2];
        resultArr.push([item[0], item[1], message]);
      }
    });

  const passIdxArr = [];
  data
    .filter((value) => value[0] !== -3)
    .forEach((item, index, arr) => {
      const length = arr.length - 1;

      if (length === 0) {
        resultArr.push(item);
        return;
      }

      if (passIdxArr.indexOf(index) > -1) return;
      resultArr.push(item);

      for (let i = index + 1; i <= length; i++) {
        if (item[2] === arr[i][2]) {
          passIdxArr.push(i);
        } else {
          break;
        }
      }
    });

  return resultArr;
}

// Main.jsx - One sentence card format
export function sentenceFormat(data) {
  if (!data) return;

  const currentDate = dateUtil.getDate(null, "YYYYMMDD");

  const sortData = sentenceSort(data);
  const dupleData = dupleDataSort(sortData);
  // console.log(data);
  // console.log(sortData);
  // console.log(resultData);

  let result = "";
  dupleData.forEach((item, index) => {
    if (item[0] === -3) {
      result += "3시간 내 ";
    } else {
      if (currentDate < item[1]) result += "내일 ";
      result += `${dateUtil.TimeFormat(item[0])}에 `;
    }

    result += item[2];
    result += index < dupleData.length - 1 ? ", " : " 소식이 있어요.";
  });

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
    case "대전":
      if (!value.includes("대전광역시")) {
        value = value.replaceAll("대전", "대전광역시");
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
