import * as dateUtil from "./dateUtil";

export function sentenceSort(data) {
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
      if (a[1] === b[1]) return 1;
      if (a[1] > b[1]) return 1;
      if (a[1] < b[1]) return -1;
    } else if (a[0] < b[0]) {
      if (a[1] === b[1]) return -1;
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
    } else {
      if (a[1] === b[1]) return 0;
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
    }
  });

  return sortData;
}

function dupleDataRemove(data) {
  const sumArr = [];
  let msg = "";
  data
    .filter((value) => value[0] === -3)
    .forEach((item, index, arr) => {
      msg += item[2];

      if (arr.length - 1 === 0) {
        sumArr.push(arr[0][0], arr[0][1], arr[0][2]);
        return;
      }

      if (index < arr.length - 1) {
        msg += "·";
      } else {
        sumArr.push(arr[0][0], arr[0][1], msg);
      }
    });

  const deleteArr = [];
  let passIndex = -1111;
  data
    .filter((value) => value[0] !== -3)
    .forEach((item, index, arr) => {
      const nextItem = arr[index + 1];

      if (index === passIndex) {
        if (item[2] === nextItem[2]) passIndex = index + 1;
        return;
      }

      if (index >= arr.length - 1) {
        deleteArr.push([item[0], item[1], item[2]]);
        return;
      }

      if (item[2] === nextItem[2]) {
        passIndex = index + 1;
      }
      deleteArr.push([item[0], item[1], item[2]]);
    });

  if (sumArr.length > 0) {
    if (deleteArr.length > 0) deleteArr.unshift(sumArr);
    else deleteArr.push(sumArr);
  }

  return deleteArr;
}

// Main.jsx - One sentence card format
export function sentenceFormat(data) {
  if (!data) return;

  const currentDate = Number(data?.fcstDate);

  // console.log(data);
  const sortData = sentenceSort(data);
  // console.log(sortData);
  const resultData = dupleDataRemove(sortData);
  // console.log(resultData);

  let result = "";
  resultData.forEach((item, index) => {
    if (item[0] === -3) {
      result += "3시간 내 ";
    } else {
      if (currentDate < item[1]) result += "내일 ";
      result += `${dateUtil.TimeFormat(item[0])}에 `;
    }

    result += item[2];
    result += index < resultData.length - 1 ? ", " : " 소식이 있어요.";
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
