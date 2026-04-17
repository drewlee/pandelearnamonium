const BASE_CODE = 'A'.charCodeAt(0);
const ALPHA_LEN = 26;
const KEY = 'VLHCGMDLNH';
const LOOKUP = [];

for (let i = 0; i < KEY.length; i++) {
  const code = KEY[i].charCodeAt(0) - BASE_CODE + 1;
  LOOKUP[i] = code;
}

function decode(message) {
  let result = '';
  let spaces = 0;

  for (let i = 0; i < message.length; i++) {
    const letter = message[i];
    let j = i - spaces;

    if (letter === ' ') {
      result += ' ';
      spaces++;
      continue;
    }

    const index = j % KEY.length;
    const offset = LOOKUP[index];
    const code = letter.charCodeAt(0) - BASE_CODE;
    let newCode = (code - offset) % ALPHA_LEN;

    if (newCode < 0) {
      newCode += ALPHA_LEN;
    }

    result += String.fromCharCode(newCode + BASE_CODE);
  }

  return result;
}
