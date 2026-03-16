const ALPHA_LEN = 26;
const LC_BASE = 'a'.charCodeAt(0);
const UC_BASE = 'A'.charCodeAt(0);

function isAlphaUC(code) {
  return code >= UC_BASE && code < UC_BASE + ALPHA_LEN;
}

function isAlphaLC(code) {
  return code >= LC_BASE && code < LC_BASE + ALPHA_LEN;
}

function decode(message, shift) {
  let decoded = '';

  for (let char of message) {
    const code = char.charCodeAt(0);
    let base = 0;

    if (isAlphaUC(code)) {
      base = UC_BASE;
    }

    if (isAlphaLC(code)) {
      base = LC_BASE;
    }

    if (base > 0) {
      let offset = (code - base - shift) % ALPHA_LEN;
      if (offset < 0) {
        offset += ALPHA_LEN;
      }
      char = String.fromCharCode(offset + base);
    }

    decoded += char;
  }

  return decoded;
}
