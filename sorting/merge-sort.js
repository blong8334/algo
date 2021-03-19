function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const lower = mergeSort(arr.slice(0, middle));
  const upper = mergeSort(arr.slice(middle));
  let lowerIdx = 0;
  let upperIdx = 0;
  const newArr = [];
  while (true) {
    if (lower[lowerIdx] < upper[upperIdx]) {
      newArr.push(lower[lowerIdx++]);
      if (lowerIdx === lower.length) return newArr.concat(upper.slice(upperIdx));
    } else {
      newArr.push(upper[upperIdx++]);
      if (upperIdx === upper.length) return newArr.concat(lower.slice(lowerIdx));
    }
  }
}