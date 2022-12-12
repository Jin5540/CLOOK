export function timeFormat(time) {
  if (time !== 0 && !time) return false;

  const clock = time > 12 ? time - 12 : time;
  let result = "";

  if (6 <= time && time < 10) {
    result = "아침 " + clock + "시";
  } else if (10 <= time && time < 12) {
    result = "오전 " + clock + "시";
  } else if (12 <= time && time < 18) {
    result = "낮 " + clock + "시";
  } else if (18 <= time && time < 22) {
    result = "저녁 " + clock + "시";
  } else if ((22 <= time && time <= 23) || time == 0) {
    result = "밤 " + clock + "시";
  } else {
    result = "새벽 " + clock + "시";
  }
  return result;
}
