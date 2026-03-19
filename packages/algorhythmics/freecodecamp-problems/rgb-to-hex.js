function rgbToHex(rgb) {
  const nums = rgb.slice(4, rgb.length - 1);
  const split = nums.split(', ');
  let result = '#';

  for (let i = 0; i < split.length; i++) {
    let value = Number(split[i]).toString(16).toLowerCase();
    if (value.length === 1) {
      value = '0' + value;
    }
    result += value;
  }

  return result;
}
