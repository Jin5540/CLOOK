import dayjs from "dayjs";

export function dateFormat(value) {
  const date = dayjs(value);
  const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const week = `(${dayOfTheWeek[date.format("d")]})`;

  return date.format("MM월 DD일 ") + week;
}
