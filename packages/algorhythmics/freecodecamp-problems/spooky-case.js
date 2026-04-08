function spookify(boo) {
  let result = '';
  let isCap = true;

  for (const char of boo) {
    if (char === '_' || char === '-') {
      result += '~';
      continue;
    }

    result += isCap ? char.toUpperCase() : char.toLowerCase();

    isCap = !isCap;
  }

  return result;
}
