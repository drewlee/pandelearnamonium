function spaceJam(s) {
  let result = '';

  for (const char of s) {
    if (char === ' ') {
      continue;
    }

    if (result.length > 0) {
      result += '  ';
    }

    result += char.toUpperCase();
  }

  return result;
}
