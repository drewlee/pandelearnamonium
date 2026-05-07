function getLongestSubstring(str) {
  let substr = '';

  for (let i = 0; i < str.length - 1; i++) {
    let slice = str[i];
    let j = i;

    while (str.indexOf(slice, i + 1) > -1) {
      if (slice.length > substr.length) {
        substr = slice;
      }

      j++;
      slice += str[j];
    }
  }

  return substr;
}
