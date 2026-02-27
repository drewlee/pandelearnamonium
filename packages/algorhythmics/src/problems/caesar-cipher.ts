const MIN_CODE_LC = 'a'.charCodeAt(0);
const MIN_CODE_UC = 'A'.charCodeAt(0);
const MAX_CODE_LC = 'z'.charCodeAt(0);
const MAX_CODE_UC = 'Z'.charCodeAt(0);
const ALPHA_TOTAL = 26;

/**
 * Helper function to determine whether the given char code
 * corresponds to an uppercase alphabetical character.
 *
 * @param charCode - Char code to test.
 * @returns Whether the given char code is an uppercase character.
 */
function isUpperCase(charCode: number): boolean {
  return charCode >= MIN_CODE_UC && charCode <= MAX_CODE_UC;
}

/**
 * Helper function to determine whether the given char code
 * corresponds to a lowercase alphabetical character.
 *
 * @param charCode - Char code to test.
 * @returns Whether the given char code is a lowercase character.
 */
function isLowerCase(charCode: number): boolean {
  return charCode >= MIN_CODE_LC && charCode <= MAX_CODE_LC;
}

/**
 * Helper function to determine whether the given char code
 * corresponds to an alphabetical character.
 *
 * @param charCode - Char code to test.
 * @returns Whether the given char code is an alphabetical character.
 */
function isAlpha(charCode: number): boolean {
  return isUpperCase(charCode) || isLowerCase(charCode);
}

/**
 * Given a char code corresponding to an alphabetical character, calculates
 * and returns a new character that is offset by the specified amount.
 *
 * @param charCode - Char code to offset.
 * @param offset - Positive or negative value to offset by.
 * @returns The offset alphanumerical character.
 */
function getOffsetChar(charCode: number, offset: number): string {
  const baseCode = isUpperCase(charCode) ? MIN_CODE_UC : MIN_CODE_LC;
  let offsetCode = (charCode + offset - baseCode) % ALPHA_TOTAL;

  // Normalize negative offsets
  if (offsetCode < 0) {
    offsetCode = ALPHA_TOTAL + offsetCode;
  }

  const offsetChar = String.fromCharCode(baseCode + offsetCode);
  return offsetChar;
}

/**
 * Encodes the given input of text using the Caesar cipher. The alphabetical characters are
 * shifted by the specified offset amount. Cases are maintained, while numbers and all other
 * non-alphabetic characters not modified.
 *
 * @param input - Input text to encode.
 * @param offset - Encoding offset value.
 * @returns An encoded version of the input text.
 */
export default function caesarCipher(input: string, offset: number): string {
  let output = '';
  input = input.trim();

  for (const char of input) {
    const code = char.charCodeAt(0);

    if (isAlpha(code)) {
      output += getOffsetChar(code, offset);
    } else {
      output += char;
    }
  }

  return output;
}
