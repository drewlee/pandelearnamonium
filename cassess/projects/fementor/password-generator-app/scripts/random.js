/** @enum {number} */
export const CHAR_TYPE = Object.freeze({
  UPPERCASE: 0,
  LOWERCASE: 1,
  NUMBER: 2,
  SYMBOL: 3,
});

const SYMBOL_CHAR_CODES = Object.freeze([33, 35, 36, 37, 45, 63, 64, 94, 95]);

/** @type {Map<number, [number, number]>} */
const CHAR_RANGE = new Map([
  [CHAR_TYPE.UPPERCASE, [65, 90]],
  [CHAR_TYPE.LOWERCASE, [97, 122]],
  [CHAR_TYPE.NUMBER, [48, 57]],
  [CHAR_TYPE.SYMBOL, [0, SYMBOL_CHAR_CODES.length - 1]],
]);

/**
 * Returns the symbol character codes array. Primarily used for testing.
 *
 * @returns {typeof SYMBOL_CHAR_CODES} The symbol character codes array.
 */
export function _getSymbolCharCodes() {
  return SYMBOL_CHAR_CODES;
}

/**
 * Returns the minimum and maximum range for the specified character type.
 * Primarily used in testing.
 *
 * @param {number} charType - The character type. @see CHAR_TYPE
 * @returns {[number, number]} The min and max range.
 */
export function _getRangeForCharType(charType) {
  return CHAR_RANGE.get(charType);
}

/**
 * Generates a random number from the specified range. If the end value isn't provided,
 * the start value defaults to `0` and the end value becomes the start value.
 *
 * @param {number} min - The starting value for the range, inclusive.
 * @param {number} [max] - The ending value for the range, exclusive.
 * @returns {number} The random number.
 */
export function getRandomNumInRange(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  const aMin = Math.min(min, max);
  const aMax = Math.max(min, max);
  const rand = Math.random();

  return Math.floor(rand * (aMax - aMin)) + aMin;
}

/**
 * Generates a random character for the specified character type.
 *
 * @param {number} charType - The character type. @see CHAR_TYPE
 * @returns {string} A random character.
 */
export function getRandomCharForType(charType) {
  const [min, max] = CHAR_RANGE.get(charType);
  let rNum = getRandomNumInRange(min, max + 1);

  // Symbols require special handling as their placement is non-contiguous.
  if (charType === CHAR_TYPE.SYMBOL) {
    return String.fromCharCode(SYMBOL_CHAR_CODES[rNum]);
  }

  return String.fromCharCode(rNum);
}

/**
 * Generates a random password of the specified length composed of the given character types.
 *
 * @param {number[]} charTypes - An array of character types. @see CHAR_TYPE
 * @param {number} length - The length of the generated password.
 * @returns {string} The randomly generated password.
 */
export function generateRandomPassword(charTypes, length) {
  let password = '';

  for (let i = 0; i < length; i++) {
    const typeIdx = getRandomNumInRange(charTypes.length);
    const charType = charTypes[typeIdx];
    const char = getRandomCharForType(charType);

    password += char;
  }

  return password;
}
