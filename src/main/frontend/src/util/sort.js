export function objValueSort(order, obj, value) {
  if (!order || !obj || !value) return;

  if (order === "asc") {
    obj.sort((a, b) => {
      return a[value] > b[value] ? 1 : a[value] < b[value] ? -1 : 0;
    });
  } else {
    // desc
    obj.sort((a, b) => {
      return a[value] < b[value] ? 1 : a[value] > b[value] ? -1 : 0;
    });
  }

  return obj;
}
