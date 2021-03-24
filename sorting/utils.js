function swap(arr, idx1, idx2) {
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function isSorted(cf, arr) {
  for (let i = 1; i < arr.length; i++) {
    if (cf(arr[i], arr[i - 1])) {
      throw new Error(`Array is not sorted, ${i} is less than ${i - 1}`);
    }
  }
  console.log('Array is sorted');
  return true;
}

function fillArray(count, lower, upper, isInt) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    let number = Math.random() * (upper - lower + 1) + lower;
    if (isInt) number = Math.floor(number);
    arr.push(number);
  }
  return arr;
}

module.exports = {
  fillArray,
  isSortedAsc: isSorted.bind(null, (a, b) => a < b),
  isSortedDesc: isSorted.bind(null, (a, b) => a > b),
  swap,
};