const ALPHA_LEN = 26;
const ALPHA_LC_BASE = 'a'.charCodeAt(0);
const ALPHA_UC_BASE = 'A'.charCodeAt(0);
const LC_REGISTRY = new Array(ALPHA_LEN).fill(3);
const UC_REGISTRY = new Array(ALPHA_LEN).fill(4);
const REGISTRY = [...LC_REGISTRY, ...UC_REGISTRY];
const WIDTHS = [
  [1, 'ilI'],
  [2, 'fjrt'],
  [3, 'JL'],
];
const LIMIT = 50;

function getRegistryIndex(letter) {
  const code = letter.charCodeAt(0);
  let index = code - ALPHA_LC_BASE;

  if (letter.toUpperCase() === letter) {
    index = code - ALPHA_UC_BASE + ALPHA_LEN;
  }

  return index;
}

function getWidth(char) {
  if (char === '.') {
    return 1;
  } else if (char === ' ') {
    return 2;
  }

  const index = getRegistryIndex(char);
  return REGISTRY[index];
}

for (const [width, letters] of WIDTHS) {
  for (const letter of letters) {
    const index = getRegistryIndex(letter);
    REGISTRY[index] = width;
  }
}

// 'ABCDEFGHKMNOPQRSTUVWXYZ'.split('').forEach((char) => {
//   console.log(char, getWidth(char));
// });

function truncateText(str) {
  let vLength = 0;
  for (const char of str) {
    vLength += getWidth(char);
  }

  if (vLength <= LIMIT) {
    return str;
  }

  let truncated = str;
  while (vLength > LIMIT - 3) {
    const char = truncated[truncated.length - 1];
    const width = getWidth(char);

    vLength -= width;
    truncated = truncated.slice(0, truncated.length - 1);
  }

  return `${truncated}...`;
}
