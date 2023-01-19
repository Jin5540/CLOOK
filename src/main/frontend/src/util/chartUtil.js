// Sort by value of given key
export function sortByValueOfKey(order, obj, key) {
  if (!order || !obj || !key) return;

  if (order === "asc") {
    obj.sort((a, b) => {
      return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
    });
  } else {
    // desc
    obj.sort((a, b) => {
      return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;
    });
  }

  return obj;
}

// Get property in an object and make it into an array
export function getPropertyIntoArray(obj, key) {
  if (!obj || !key) return;

  const array = [];
  obj.forEach((item) => {
    if (item.hasOwnProperty(key)) {
      array.push(item[key]);
    }
  });

  return array.length > 0 ? array : null;
}

// Add a property to that object
export function addPropertyToObj(obj, key, value) {
  if (!obj || !key || value === undefined || value === null) return;

  obj.forEach((item) => {
    if (!item.hasOwnProperty(key)) {
      item[key] = value;
    }
  });

  return obj;
}

// Change property type
export function changePropertyType(obj, key, type) {
  if (!obj || !key || !type) return;
  if (type !== "number" && type !== "string") return;

  obj.forEach((item) => {
    if (item.hasOwnProperty(key)) {
      type === "number"
        ? (item[key] = Number(item[key]))
        : (item[key] = item[key].toString());
    }
  });

  return obj;
}

// Convert to chart data format
export function chartDataFormat(obj, propForX, propForY) {
  if (!obj || !propForX || !propForY) return;

  const chartData = [
    {
      id: "Today's weather",
      data: [],
    },
  ];
  obj.forEach((item) => {
    chartData[0].data.push({
      x: item[propForX] / 100,
      y: item[propForY],
    });
  });

  return chartData.length > 0 ? chartData : null;
}

// Chart y-tick scope
export function getMaxMin(obj, key) {
  if (!obj || !key) return;

  let max = -10000;
  let min = 10000;

  obj.forEach((item) => {
    max = item[key] < max ? max : item[key] === max ? max : item[key];
    min = item[key] > min ? min : item[key] === min ? min : item[key];
  });

  return { max, min };
}
