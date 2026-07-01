function getLuckyNumber(name) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const [fName, lName] = name.split(' ');
  let fNameVowels = 0;
  let fNameCons = 0;
  let lNameVowels = 0;
  let lNameCons = 0;

  for (const letter of fName) {
    if (vowels.includes(letter.toLowerCase())) {
      fNameVowels++;
    } else {
      fNameCons++;
    }
  }

  for (const letter of lName) {
    if (vowels.includes(letter.toLowerCase())) {
      lNameVowels++;
    } else {
      lNameCons++;
    }
  }

  const smProduct =
    Math.min(fNameVowels, lNameVowels) *
    Math.min(fNameCons, lNameCons) *
    Math.min(fName.length, lName.length);

  const lgProduct =
    Math.max(fNameVowels, lNameVowels) *
    Math.max(fNameCons, lNameCons) *
    Math.max(fName.length, lName.length);

  const diff = lgProduct - smProduct;

  return diff === 0 ? 13 : diff;
}
