
function mergeSort(arr, low = 0, high = arr.length - 1) {
  if ((high - low + 1) <= 1) return [arr[low]];
  const middle = Math.floor((high - low + 1) / 2) + low;
  const lower = mergeSort(arr, low, middle - 1);
  const upper = mergeSort(arr, middle, high);
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

module.exports = {
  mergeSort,
}