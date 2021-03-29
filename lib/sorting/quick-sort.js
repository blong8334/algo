const { swap } = require('../utils');

function quickSort(arr, lowerIdx = 0, upperIdx = arr.length - 1) {
  if (upperIdx <= lowerIdx) return;
  let partIdx = lowerIdx;
  let upper = upperIdx;
  const newPart = Math.floor(Math.random() * (upperIdx - lowerIdx + 1) + lowerIdx);
  swap(arr, partIdx, newPart);
  while (true) {
    if (upperIdx === partIdx) {
      quickSort(arr, lowerIdx, partIdx - 1);
      quickSort(arr, partIdx + 1, upper);
      return;
    } else if (arr[partIdx + 1] <= arr[partIdx]) {
      swap(arr, partIdx + 1, partIdx);
      partIdx += 1;
    } else {
      swap(arr, partIdx + 1, upperIdx);
      upperIdx -= 1;
    }
  }
}

module.exports = {
  quickSort,
};