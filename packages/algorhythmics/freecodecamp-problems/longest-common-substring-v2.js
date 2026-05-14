function getLongestSubstring(str) {
  const sLen = str.length;
  if (!sLen) {
    return '';
  }

  let maxLen = 0;
  let end = 0;

  const dp = new Array(sLen + 1).fill(null).map(() => new Array(sLen + 1).fill(0));

  for (let i = 1; i <= sLen - 1; i++) {
    for (let j = i + 1; j <= sLen; j++) {
      if (str[i - 1] === str[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;

        if (dp[i][j] > maxLen) {
          maxLen = dp[i][j];
          end = j;
        }
      }
    }
  }

  return str.slice(end - maxLen, end);
}
