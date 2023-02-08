export function getPmFormat(pm) {
  if (!pm) return;

  if (pm === "1") return "좋음";
  else if (pm === "2") return "보통";
  else if (pm === "3") return "나쁨";
  else if (pm === "4") return "매우 나쁨";
  else return;
}

export function getUvFormat(uv) {
  if (!uv) return;

  uv = Number(uv);

  if (uv < 3) return "낮음";
  else if (3 <= uv && uv < 6) return "보통";
  else if (6 <= uv && uv < 8) return "높음";
  else if (8 <= uv && uv < 11) return "매우 높음";
  else if (11 <= uv) return "위험";
  else return;
}

export function getWindFormat(wind) {
  if (!wind) return;

  wind = Number(wind);

  if (wind < 4) return "약함";
  else if (4 <= wind && wind < 9) return "약간 강함";
  else if (9 <= wind && wind < 14) return "강함";
  else if (14 <= wind) return "매우 강함";
  else return;
}

export function changeColor(value) {
  if (!value) return;

  if (value === "1" || value === "약함" || value === "낮음" || value === "보통")
    return "text-green";
  else if (value === "2" || value === "약간 강함" || value === "높음")
    return "text-yellow";
  else if (
    value === "3" ||
    value === "4" ||
    value === "강함" ||
    value === "매우 강함" ||
    value === "매우 높음" ||
    value === "위험"
  )
    return "text-red"; // 3(나쁨-미세), 4(매우 나쁨-미세), 강함(바람), 매우 강함(바람), 매우 높음(자외선), 위험(자외선)
  else return;
}

export function pmTimeFormat(date) {
  if (!date) return;

  const word = date.split(" ");
  const hour = Number(word[1].slice(0, 2));

  return hour;
}

export function sunsTimeFormat(time) {
  if (!time) return;

  time = time.toString();

  const hour = time.slice(0, 2);
  const minute = time.slice(2, time.length);
  return `${hour < 12 ? "오전" : "오후"} ${hour}:${minute}`;
}

export function timeFormat(type, date) {
  if (!date) return;

  let time = "";

  if (type === "pm") {
    const word = date.split(" ");
    const hour = Number(word[1].slice(0, 2));
    time = `${hour}시 업데이트`;
    //
  } else if (type === "uv") {
    const hour = Number(date.slice(date?.length - 2));
    time = `${hour}시 업데이트`;
    //
  } else {
    const hour = Number(date.slice(0, 2));
    const minute = Number(date.slice(2));

    time = `${hour}시 ${minute > 0 ? minute + "분 " : ""}업데이트`;
  }

  return time;
}

export function compoundCardData(card, uv, air, sun) {
  const updateTime = timeFormat("", card?.fcstTime);

  const data = [
    {
      type: air && air.pm10Grade1h !== "오류" ? 1 : 0,
      id: "pm",
      name: "미세먼지",
      title: "현재 미세먼지",
      titleIcon: false,
      text1: "미세먼지",
      value1: getPmFormat(air?.pm10Grade1h),
      text2: "초미세먼지",
      value2: getPmFormat(air?.pm25Grade1h),
      color1: changeColor(air?.pm10Grade1h),
      color2: changeColor(air?.pm25Grade1h),
      stationName: air?.stationName,
      time: timeFormat("pm", air?.dataTime),
    },
    {
      type: uv ? 2 : 0,
      id: "uv",
      name: "자외선",
      title: "현재 자외선",
      titleIcon: false,
      text1: getUvFormat(uv?.h0),
      value1: `${uv?.h0}mm`,
      color1: changeColor(getUvFormat(uv?.h0)),
      time: timeFormat("uv", uv?.time),
    },
    {
      type: card ? 2 : 0,
      id: "wind",
      name: "바람",
      title: "현재 바람",
      titleIcon: true,
      text1: getWindFormat(card?.wsd),
      value1: `${card?.vec} - ${card?.wsd}m/s`,
      color1: changeColor(getWindFormat(card?.wsd)),
      time: updateTime,
    },
    {
      type: card ? 3 : 0,
      id: "humidity",
      name: "습도",
      title: "현재 습도",
      titleIcon: true,
      value1: `${card?.reh}%`,
      time: updateTime,
    },
    {
      type: card ? 3 : 0,
      id: "precipitation",
      name: "강수량",
      title: "현재 강수량",
      titleIcon: true,
      value1: card?.rn1,
      time: updateTime,
    },
    {
      type: sun ? 1 : 0,
      id: "sun",
      name: "일출일몰",
      title: "오늘 일출/일몰",
      titleIcon: true,
      text1: "일출",
      value1: sunsTimeFormat(sun?.sunrise),
      text2: "일몰",
      value2: sunsTimeFormat(sun?.sunset),
    },
  ];

  return data;
}
