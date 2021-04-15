function longestCommonSubsequence(string1, string2) {
  const stringCache = {};
  const results = helper(string1.length - 1, string2.length - 1);
  return results;

  function helper(string1Idx, string2Idx) {
    if (string1Idx < 0 || string2Idx < 0) {
      return 0;
    }
    const key = '' + string1Idx + string2Idx;
    const cacheResult = stringCache[key];
    if (cacheResult !== undefined) {
      return cacheResult;
    }
    let result;
    if (string1[string1Idx] === string2[string2Idx]) {
      result = helper(string1Idx - 1, string2Idx - 1) + 1;
    } else {
      const result1 = helper(string1Idx - 1, string2Idx);
      const result2 = helper(string1Idx, string2Idx - 1);
      result = result1 > result2 ? result1 : result2;
    }
    stringCache[key] = result;
    return result;
  }
}

module.exports = {
  longestCommonSubsequence,
};