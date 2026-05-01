const grid = [
  '01000001',
  '01101111',
  '01000100',
  '01100101',
  '01010010',
  '01010100',
  '01101000',
  '10101110',
];

function isInCrossword(char) {
  const code = char.charCodeAt(0);
  let bin = code.toString(2);

  // Pad the binary value with zeros
  while (bin.length < 8) {
    bin = '0' + bin;
  }

  // Get a reverse version of the string
  let rBin = '';
  for (let i = bin.length - 1; i >= 0; i--) {
    rBin += bin[i];
  }

  // Horizontal scan
  for (const row of grid) {
    if (bin === row || rBin === row) {
      return true;
    }
  }

  // Vertical scan
  for (let i = 0; i < grid[0].length; i++) {
    let isMatch = true;
    let isRevMatch = true;

    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] !== bin[j]) {
        isMatch = false;
      }

      if (grid[j][i] !== rBin[j]) {
        isRevMatch = false;
      }
    }

    if (isMatch || isRevMatch) {
      return true;
    }
  }

  return false;
}
