function generateHex(color) {
  const colors = new Map([
    ['red', ['F', 'F', null, null, null, null]],
    ['green', [null, null, 'F', 'F', null, null]],
    ['blue', [null, null, null, null, 'F', 'F']],
  ]);

  if (!colors.has(color)) {
    return 'Invalid color';
  }

  const hex = [...colors.get(color)];

  for (let i = 0; i < hex.length; i++) {
    if (hex[i] !== null) {
      continue;
    }

    const value = Math.floor(Math.random() * 15);
    hex[i] = value.toString(16).toUpperCase();
  }

  const result = hex.join('');
  return result;
}
