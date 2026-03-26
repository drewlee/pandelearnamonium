function isSpam(number) {
  const parts = number.split(' ');

  const countryCode = parts[0].slice(1);
  if (countryCode.length > 2 || countryCode[0] !== '0') {
    return true;
  }

  const areaCode = parts[1].slice(1, parts[1].length - 1);
  if (Number(areaCode) < 200 || Number(areaCode) > 900) {
    return true;
  }

  const [firstLocal, secondLocal] = parts[2].split('-');
  const sum = [...firstLocal].reduce((a, b) => a + Number(b), 0);
  for (const value of secondLocal) {
    if (Number(value) === sum) {
      return true;
    }
  }

  const trimNumber = [...countryCode, ...areaCode, ...firstLocal, ...secondLocal].join('');

  let left = 0;
  for (let right = 1; right < trimNumber.length; right++) {
    if (trimNumber[left] !== trimNumber[right]) {
      left = right;
    } else if (right - left + 1 >= 4) {
      return true;
    }
  }

  return false;
}
