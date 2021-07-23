function binarySearch(target, arr, checker) {
  if (!arr || !arr.length) {
    return;
  }
  let lowerBound = 0;
  let upperBound = arr.length - 1;
  const getNextIndex = () => Math.floor((upperBound - lowerBound) / 2) + lowerBound;
  let currentIdx = getNextIndex();
  while (true) {
    const currentValue = arr[currentIdx];
    if (currentValue === target) {
      return currentIdx;
    }
    if (upperBound <= lowerBound) {
      if (checker) {
        return checker(arr, currentIdx, target);
      }
      return null;
    }
    if (target < currentValue) {
      upperBound = currentIdx - 1;
    } else {
      lowerBound = currentIdx + 1;
    }
    currentIdx = getNextIndex();
  } 
}

module.exports = {
  binarySearch,
};