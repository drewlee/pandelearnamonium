const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

function isBalanced(s) {
  const mid = Math.floor(s.length / 2);
  let lCount = 0;
  let rCount = 0;

  for (let i = 0; i < mid; i++) {
    const lChar = s[i];
    const rChar = s[s.length - i - 1];

    if (vowels.has(lChar.toLowerCase())) {
      lCount++;
    }

    if (vowels.has(rChar.toLowerCase())) {
      rCount++;
    }
  }

  return lCount === rCount;
}
