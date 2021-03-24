function countingSort(arr, lower, upper) {
  const valueCount = new Array(upper - lower + 1);
  for (let i = 0; i < arr.length; i++) {
    if (!valueCount[arr[i] - lower]) valueCount[arr[i] - lower] = 0;
    valueCount[arr[i] - lower]++;
  }
  for (let i = 1; i < valueCount.length; i++) valueCount[i] += valueCount[i - 1];
  const newArr = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) newArr[--valueCount[arr[i] - lower]] = arr[i];
  return newArr;
}

module.exports = {
  countingSort,
};