function isMirror(str1, str2) {
  const pattern = /[a-z]/i;
  let idx1 = 0;
  let idx2 = str2.length - 1;

  while (idx1 < str1.length || idx2 >= 0) {
    if (!pattern.test(str1[idx1])) {
      idx1++;
      continue;
    }

    if (!pattern.test(str2[idx2])) {
      idx2--;
      continue;
    }

    if (str1[idx1] !== str2[idx2]) {
      return false;
    }

    idx1++;
    idx2--;
  }

  return true;
}
