function checkPathCache(row, col, pathCache, cols) {
  if (!pathCache[row]) {
    pathCache[row] = new Array(cols);
  }
  const value = pathCache[row][col];
  return value === undefined ? -1 : value;
}

function countingPaths(rows, cols) {
  const pathCache = new Array(rows);
  return helper(0, 0);

  function helper(row, col) {
    if (row === rows - 1 && col === cols - 1) {
      return 1;
    }
    if (row === rows || col === cols) {
      return 0;
    }
    const cachedWays = checkPathCache(row, col, pathCache, cols);
    if (cachedWays > -1) {
      return cachedWays;
    }
    const downWays = helper(row + 1, col);
    const leftWays = helper(row, col + 1);
    pathCache[row][col] = downWays + leftWays;
    return downWays + leftWays;
  }

}

module.exports = {
  countingPaths,
};