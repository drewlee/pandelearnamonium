function separateLettersAndNumbers(str) {
  let newStr = str[0];

  for (let i = 1; i < str.length; i++) {
    const prevChar = str[i - 1];
    const currChar = str[i];

    if (Number.isNaN(Number(prevChar)) !== Number.isNaN(Number(currChar))) {
      newStr += '-';
    }

    newStr += currChar;
  }

  return newStr;
}
