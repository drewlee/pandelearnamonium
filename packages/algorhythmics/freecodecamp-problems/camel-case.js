function toCamelCase(s) {
  const seps = new Set([' ', '-', '_']);
  let result = s[0].toLowerCase();

  for (let i = 1; i < s.length; i++) {
    const prev = s[i - 1];
    const curr = s[i];

    if (!seps.has(curr)) {
      if (seps.has(prev)) {
        result += curr.toUpperCase();
      } else {
        result += curr.toLowerCase();
      }
    }
  }

  return result;
}
