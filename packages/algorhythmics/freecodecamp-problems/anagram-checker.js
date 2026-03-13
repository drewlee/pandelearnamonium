function areAnagrams(str1, str2) {
  const seen = new Map();

  for (const char of str1) {
    if (char === ' ') {
      continue;
    }

    const nChar = char.toLowerCase();
    if (!seen.has(nChar)) {
      seen.set(nChar, 0);
    }
    seen.set(nChar, seen.get(nChar) + 1);
  }

  for (const char of str2) {
    if (char === ' ') {
      continue;
    }
    const nChar = char.toLowerCase();
    if (!seen.has(nChar)) {
      return false;
    }

    const count = seen.get(nChar) - 1;
    seen.set(nChar, count);
    if (count === 0) {
      seen.delete(nChar);
    }
  }

  if (seen.size) {
    return false;
  }

  return true;
}
