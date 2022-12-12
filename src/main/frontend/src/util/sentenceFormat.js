export function sentenceFormat(value) {
  if (!value) return;

  const hour = Number(value.slice(0, 2));

  if (hour === 0) {
    return "현재 ";
  } else {
    return `${hour}시간 뒤에 `;
  }
}
