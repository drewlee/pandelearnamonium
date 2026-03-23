function generateSlug(str) {
  const pattern = /[a-z0-9]/i;
  let result = '';
  str = str.trim();

  for (let i = 0; i < str.length; i++) {
    if (pattern.test(str[i])) {
      result += str[i].toLowerCase();
    } else if (str[i] === ' ' && str[i - 1] !== ' ') {
      result += '%20';
    }
  }

  return result;
}
