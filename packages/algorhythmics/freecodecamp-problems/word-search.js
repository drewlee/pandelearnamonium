function findWord(matrix, word) {
  const rWord = word.split('').reverse().join('');

  for (let row = 0; row < matrix.length; row++) {
    const substr = [];
    let pointer = 0;

    for (let col = 0; col < word.length; col++) {
      substr.push(matrix[row][col]);

      if (col === word.length - 1) {
        const joined = substr.join('');

        if (joined === word) {
          return [
            [row, pointer],
            [row, col],
          ];
        }

        if (joined === rWord) {
          return [
            [row, col],
            [row, pointer],
          ];
        }
      }
    }

    for (let col = word.length; col < matrix[row].length; col++) {
      substr.shift();
      substr.push(matrix[row][col]);
      pointer++;

      const joined = substr.join('');

      if (joined === word) {
        return [
          [row, pointer],
          [row, col],
        ];
      }

      if (joined === rWord) {
        return [
          [row, col],
          [row, pointer],
        ];
      }
    }
  }

  for (let col = 0; col < matrix[0].length; col++) {
    const substr = [];
    let pointer = 0;

    for (let row = 0; row < word.length; row++) {
      substr.push(matrix[row][col]);

      if (row === word.length - 1) {
        const joined = substr.join('');

        if (joined === word) {
          return [
            [pointer, col],
            [row, col],
          ];
        }

        if (joined === rWord) {
          return [
            [row, col],
            [pointer, col],
          ];
        }
      }
    }

    for (let row = word.length; row < matrix.length; row++) {
      substr.shift();
      substr.push(matrix[row][col]);
      pointer++;

      const joined = substr.join('');

      if (joined === word) {
        return [
          [pointer, col],
          [row, col],
        ];
      }

      if (joined === rWord) {
        return [
          [row, col],
          [pointer, col],
        ];
      }
    }
  }

  return [];
}
