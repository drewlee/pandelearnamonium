import {
  CHAR_TYPE,
  generateRandomPassword,
  getRandomCharForType,
  getRandomNumInRange,
  getRangeForCharType,
  _getSymbolCharCodes,
} from '../index.js';

afterEach(() => {
  vi.restoreAllMocks();
});

/**
 * Test helper function to return a specific float value when mocking `Math.random`.
 * The float value is based off of the specified `min` and `max` range and corresponds
 * to the given `charCode`. For example, the range for uppercase letters is 65 - 90.
 * The code for the letter "M" is 77. The value that `Math.random` needs to return to
 * equate to 77 is 0.4615...
 *
 * @param {number} min - The minimum value in the range.
 * @param {number} max - The maximum value in the range.
 * @param {number} value - The value to generate the float for.
 * @returns {number} The float value to be returned by `Math.random`.
 */
function getMockRandomNumForRange(min, max, value) {
  return (value - min) / (max - min);
}

describe('getRandomCharForType', () => {
  test('Gets a random character for the specified character type', () => {
    const result = getRandomCharForType(CHAR_TYPE.UPPERCASE);

    expect(result).toBeTypeOf('string');
    expect(result.length).toBe(1);
  });

  test('Gets an uppercase letter in the expected range', () => {
    const mathSpy = vi.spyOn(Math, 'random');
    const charType = CHAR_TYPE.UPPERCASE;
    let [min, max] = getRangeForCharType(charType);
    max += 1; // Max is exclusive

    // Minimum range value
    let char = 'A';
    let mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    let result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Maximum range value
    char = 'Z';
    mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Somewhere in the first half
    char = 'H';
    mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Somewhere in the last half
    char = 'Q';
    mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);
  });

  test('Gets a lowercase letter in the expected range', () => {
    const mathSpy = vi.spyOn(Math, 'random');
    const charType = CHAR_TYPE.LOWERCASE;
    let [min, max] = getRangeForCharType(charType);
    max += 1; // Max is exclusive

    // Minimum range value
    let char = 'a';
    let mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    let result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Maximum range value
    char = 'z';
    mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Somewhere in between
    char = 'm';
    mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);
  });

  test('Gets a number in the expected range', () => {
    const mathSpy = vi.spyOn(Math, 'random');
    const charType = CHAR_TYPE.NUMBER;
    let [min, max] = getRangeForCharType(charType);
    max += 1; // Max is exclusive

    // Minimum range value
    let char = '0';
    let mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    let result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Maximum range value
    char = '9';
    mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Somewhere in the first half
    char = '3';
    mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Somewhere in the last half
    char = '7';
    mockR = getMockRandomNumForRange(min, max, char.charCodeAt(0));
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);
  });

  test('Gets a symbol in the expected range', () => {
    const mathSpy = vi.spyOn(Math, 'random');
    const charType = CHAR_TYPE.SYMBOL;
    let [min, max] = getRangeForCharType(charType);
    max += 1; // Max is exclusive

    // Minimum range value
    let char = '!';
    let mockR = getMockRandomNumForRange(min, max, 0);
    mathSpy.mockReturnValue(mockR);

    let result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Maximum range value
    char = '_';
    mockR = getMockRandomNumForRange(min, max, 8);
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Somewhere in the first half
    char = '$';
    mockR = getMockRandomNumForRange(min, max, 2);
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);

    // Somewhere in the last half
    char = '@';
    mockR = getMockRandomNumForRange(min, max, 6);
    mathSpy.mockReturnValue(mockR);

    result = getRandomCharForType(charType);
    expect(result).toBe(char);
  });
});

describe('generateRandomPassword', () => {
  test('Generates a password of the specified length', () => {
    const charType = [CHAR_TYPE.LOWERCASE];
    const result = generateRandomPassword(charType, 10);

    expect(result.length).toBe(10);
  });

  test('Generates a password of all uppercase characters', () => {
    const charType = [CHAR_TYPE.UPPERCASE];
    const result = generateRandomPassword(charType, 10);

    expect(/^[A-Z]{10}$/.test(result)).toBeTruthy();
  });

  test('Generates a password of all lowercase characters', () => {
    const charType = [CHAR_TYPE.LOWERCASE];
    const result = generateRandomPassword(charType, 10);

    expect(/^[a-z]{10}$/.test(result)).toBeTruthy();
  });

  test('Generates a password of all number characters', () => {
    const charType = [CHAR_TYPE.NUMBER];
    const result = generateRandomPassword(charType, 10);

    expect(/^[0-9]{10}$/.test(result)).toBeTruthy();
  });

  test('Generates a password of all symbol characters', () => {
    const charType = [CHAR_TYPE.SYMBOL];
    const result = generateRandomPassword(charType, 10);

    expect(/^[!@#$%^&\-_?]{10}$/.test(result)).toBeTruthy();
  });

  test('Generates a password of mixed characters', () => {
    const charTypes = [
      CHAR_TYPE.UPPERCASE,
      CHAR_TYPE.LOWERCASE,
      CHAR_TYPE.NUMBER,
      CHAR_TYPE.SYMBOL,
    ];
    const result = generateRandomPassword(charTypes, 20);
    const regexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&\-_?]).{20}$/;

    expect(regexp.test(result)).toBeTruthy();
  });

  test('Generates the expected password', () => {
    const password = '_H@x0r4vR?69_';
    const charTypes = [
      CHAR_TYPE.UPPERCASE,
      CHAR_TYPE.LOWERCASE,
      CHAR_TYPE.NUMBER,
      CHAR_TYPE.SYMBOL,
    ];
    let mathSpy = vi.spyOn(Math, 'random');

    for (const char of password) {
      const [ucMin, ucMax] = getRangeForCharType(CHAR_TYPE.UPPERCASE);
      const [lcMin, lcMax] = getRangeForCharType(CHAR_TYPE.LOWERCASE);
      const [numMin, numMax] = getRangeForCharType(CHAR_TYPE.NUMBER);
      let code = char.charCodeAt(0);
      let typeIdx = -1;
      let [min, max] = [-1, -1];

      if (code >= ucMin && code <= ucMax) {
        // Uppercase
        typeIdx = 0;
        min = ucMin;
        max = ucMax;
      } else if (code >= lcMin && code <= lcMax) {
        // Lowercase
        typeIdx = 1;
        min = lcMin;
        max = lcMax;
      } else if (code >= numMin && code <= numMax) {
        // Number
        typeIdx = 2;
        min = numMin;
        max = numMax;
      } else {
        // Symbol
        typeIdx = 3;
        [min, max] = getRangeForCharType(CHAR_TYPE.SYMBOL);
        code = _getSymbolCharCodes().indexOf(code);
      }

      let mockR = getMockRandomNumForRange(0, charTypes.length, typeIdx);
      mathSpy = mathSpy.mockReturnValueOnce(mockR);

      mockR = getMockRandomNumForRange(min, max + 1, code); // Max is exclusive
      mathSpy = mathSpy.mockReturnValueOnce(mockR);
    }

    const result = generateRandomPassword(charTypes, password.length);
    expect(result).toBe(password);
  });
});

describe('getRandomNumInRange', () => {
  test('Gets a number in the expected range', () => {
    const mathSpy = vi.spyOn(Math, 'random');
    const min = 6;
    const max = 18;

    // Minimum range value
    let mockR = getMockRandomNumForRange(min, max, min);
    mathSpy.mockReturnValue(mockR);

    let result = getRandomNumInRange(min, max);
    expect(result).toBe(min);

    // Maximum range value
    mockR = getMockRandomNumForRange(min, max, max - 1); // Max is exclusive
    mathSpy.mockReturnValue(mockR);
    result = getRandomNumInRange(min, max);

    expect(result).toBe(max - 1);
  });

  test('Defaults `min` to 0 if the `max` arg is not specified', () => {
    const mathSpy = vi.spyOn(Math, 'random');
    const max = 5;

    // Minimum range value
    let mockR = getMockRandomNumForRange(0, max, 0);
    mathSpy.mockReturnValue(mockR);

    let result = getRandomNumInRange(max);
    expect(result).toBe(0);

    // Maximum range value
    mockR = getMockRandomNumForRange(0, max, max - 1); // Max is exclusive
    mathSpy.mockReturnValue(mockR);
    result = getRandomNumInRange(max);

    expect(result).toBe(max - 1);
  });

  test('The order of args does not matter', () => {
    const mathSpy = vi.spyOn(Math, 'random');
    const min = 2;
    const max = 20;

    // Minimum range value
    let mockR = getMockRandomNumForRange(min, max, min);
    mathSpy.mockReturnValue(mockR);

    let result = getRandomNumInRange(max, min);
    expect(result).toBe(min);

    // Maximum range value
    mockR = getMockRandomNumForRange(min, max, max - 1); // Max is exclusive
    mathSpy.mockReturnValue(mockR);
    result = getRandomNumInRange(max, min);

    expect(result).toBe(max - 1);
  });
});
