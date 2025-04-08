import { getRangeForCharType } from './random.js';

/** @enum {number} */
const PASSWORD_STRENGTH = Object.freeze({
  VERY_WEAK: 0,
  WEAK: 1,
  MEDIUM: 2,
  STRONG: 3,
});

/**
 * Calculates the strength of a password based on the character types used for
 * its composition and length.
 *
 * @param {number[]} charTypes - The character types. @see CHAR_TYPE
 * @param {number} length - The length of the password.
 * @returns {number} The strength of the password represented as an enum. @see PASSWORD_STRENGTH
 */
export function calcPasswordStrength(charTypes, length) {
  const charSum = charTypes.reduce((sum, charType) => {
    const [min, max] = getRangeForCharType(charType);
    const charTypeTotals = max - min + 1;
    sum += charTypeTotals;

    return sum;
  }, 0);

  // Strength calculation based on entropy in bits.
  const ent = Math.round(length * Math.log2(charSum));

  if (ent < 40) {
    return PASSWORD_STRENGTH.VERY_WEAK;
  } else if (ent < 60) {
    return PASSWORD_STRENGTH.WEAK;
  } else if (ent < 80) {
    return PASSWORD_STRENGTH.MEDIUM;
  } else {
    return PASSWORD_STRENGTH.STRONG;
  }
}
