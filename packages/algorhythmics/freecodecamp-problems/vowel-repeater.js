function repeatVowels(str) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let times = 0;
  let result = '';

  for (const char of str) {
    if (vowels.has(char.toLowerCase())) {
      result += char;
      result += char.toLowerCase().repeat(times);
      times++;
    } else {
      result += char;
    }
  }

  return result;
}
