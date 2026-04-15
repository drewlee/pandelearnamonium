function isMatch(fingerprintA, fingerprintB) {
  if (fingerprintA.length !== fingerprintB.length) {
    return false;
  }

  const len = fingerprintA.length;
  let diffCount = 0;

  for (let i = 0; i < len; i++) {
    if (fingerprintA[i] !== fingerprintB[i]) {
      diffCount++;
    }
  }

  return (diffCount / len) * 100 <= 10;
}
