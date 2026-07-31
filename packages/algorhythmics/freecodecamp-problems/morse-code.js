function decodeMorse(code) {
  const letterMap = new Map([
    ['.-', 'A'],
    ['-...', 'B'],
    ['-.-.', 'C'],
    ['-..', 'D'],
    ['.', 'E'],
    ['..-.', 'F'],
    ['--.', 'G'],
    ['....', 'H'],
    ['..', 'I'],
    ['.---', 'J'],
    ['-.-', 'K'],
    ['.-..', 'L'],
    ['--', 'M'],
    ['-.', 'N'],
    ['---', 'O'],
    ['.--.', 'P'],
    ['--.-', 'Q'],
    ['.-.', 'R'],
    ['...', 'S'],
    ['-', 'T'],
    ['..-', 'U'],
    ['...-', 'V'],
    ['.--', 'W'],
    ['-..-', 'X'],
    ['-.--', 'Y'],
    ['--..', 'Z'],
  ]);

  const result = [];
  const words = code.split('   ');

  for (const word of words) {
    const letters = word.split(' ');
    let decoded = '';

    for (const letter of letters) {
      decoded += letterMap.get(letter);
    }

    result.push(decoded);
  }

  return result.join(' ');
}
