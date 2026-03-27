function checkStrength(password) {
  const specialChars = new Set(['!', '@', '#', '$', '%', '^', '&', '*']);
  const meetsLength = password.length >= 8;
  const hasLetters = /[a-z]+/.test(password) && /[A-Z]+/.test(password);
  const hasNumber = /\d+/.test(password);
  const hasSpecialChar = password.split('').some((char) => specialChars.has(char));

  const qualifiers = [meetsLength, hasLetters, hasNumber, hasSpecialChar].reduce(
    (count, qualifier) => {
      if (qualifier) {
        count++;
      }
      return count;
    },
    0,
  );

  if (qualifiers < 2) {
    return 'weak';
  } else if (qualifiers < 4) {
    return 'medium';
  }

  return 'strong';
}
