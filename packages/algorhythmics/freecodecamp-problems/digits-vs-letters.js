function digitsOrLetters(str) {
  let digits = 0;
  let letters = 0;

  for (const char of str) {
    if (/\d/.test(char)) {
      digits++;
    } else if (/[a-z]/i.test(char)) {
      letters++;
    }
  }

  if (digits > letters) {
    return 'digits';
  } else if (digits < letters) {
    return 'letters';
  }
  return 'tie';
}
