function groupAnagrams(words) {
  const anagMap = new Map();
  const solution = [];

  for (const word of words) {
    const key = word.split('').sort().join('');

    if (!anagMap.has(key)) {
      anagMap.set(key, []);
    }

    anagMap.get(key).push(word);
  }

  for (const values of anagMap.values()) {
    solution.push(values);
  }

  return solution;
}
