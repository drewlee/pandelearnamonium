import caesarCipher from '../../src/problems/caesar-cipher.ts';

describe('Base implementation', () => {
  test('Encodes the input string', () => {
    const value = 'Hello, world!';
    const result = caesarCipher(value, 3);
    // cSpell:disable-next-line
    const expected = 'Khoor, zruog!';

    expect(expected).toBe(result);
  });

  test('Decodes the input string', () => {
    // cSpell:disable-next-line
    const value = 'Ebiil, tloia!';
    const result = caesarCipher(value, 3);
    const expected = 'Hello, world!';

    expect(result).toBe(expected);
  });

  test('Removes leading and trailing whitespace', () => {
    const value = '     Hello, world!   ';
    const result = caesarCipher(value, 3);
    // cSpell:disable-next-line
    const expected = 'Khoor, zruog!';

    expect(result).toBe(expected);
  });

  test('Does not encode numbers and punctuation', () => {
    const value = '&1234()[]Hello, world!?56789*😎🤓';
    const result = caesarCipher(value, 3);
    // cSpell:disable-next-line
    const expected = '&1234()[]Khoor, zruog!?56789*😎🤓';

    expect(result).toBe(expected);
  });

  test('Works with a noop offset', () => {
    const value = 'Hello, world!';

    let result = caesarCipher(value, 26);
    expect(result).toBe(value);

    result = caesarCipher(value, 0);
    expect(result).toBe(value);
  });

  test('Works with a negative noop offset', () => {
    const value = 'Hello, world!';
    const result = caesarCipher(value, -26);

    expect(result).toBe(value);
  });

  test('Works with an overflow offset', () => {
    const value = 'Hello, world!';
    const result = caesarCipher(value, 33);
    const expected = caesarCipher(value, 7);

    expect(result).toBe(expected);
  });

  test('Works with a negative overflow offset', () => {
    const value = 'Hello, world!';
    const result = caesarCipher(value, -33);
    const expected = caesarCipher(value, -7);

    expect(result).toBe(expected);
  });
});

describe('Input and output', () => {
  test('Long input text', () => {
    const value =
      'To be, or not to be, that is the question: Whether ’tis nobler in the mind to ' +
      'suffer\nThe slings and arrows of outrageous fortune,\nOr to take arms against a sea of ' +
      'troubles\nAnd by opposing end them';
    const encoded = caesarCipher(value, 17);
    const decoded = caesarCipher(encoded, -17);

    expect(decoded).toBe(value);
  });

  test('Long input text with numbers', () => {
    const value =
      'But this speech, given on the occasion of the Battle of Agincourt on 25 October 1415, ' +
      'captures the sense of comradeship and patriotism which binds the men together on the ' +
      'field of battle.';
    const encoded = caesarCipher(value, 21);
    const decoded = caesarCipher(encoded, -21);

    expect(decoded).toBe(value);
  });
});
