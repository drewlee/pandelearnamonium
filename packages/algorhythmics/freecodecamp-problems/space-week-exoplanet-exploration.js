const BASE_CODE = 'A'.charCodeAt(0);
const BASE_VAL = 10;

function hasExoplanet(readings) {
  const rawValues = [];
  let sum = 0;

  for (const char of readings) {
    let val;

    if (/\d/.test(char)) {
      val = Number(char);
    } else {
      const code = char.charCodeAt(0);
      val = BASE_VAL + code - BASE_CODE;
    }

    rawValues.push(val);
    sum += val;
  }

  const average = sum / readings.length;

  for (const val of rawValues) {
    if (val / average <= 0.8) {
      return true;
    }
  }

  return false;
}
