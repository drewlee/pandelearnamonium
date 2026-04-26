function getZCount(str) {
  let count = 0;

  for (const letter of str) {
    if (letter === 'z') {
      count++;
    }
  }

  return count;
}

function explodeFizzbuzz(targetZCount) {
  let str = 'fizzbuzz';
  let steps = 0;

  while (getZCount(str) < targetZCount) {
    let nStr = '';

    for (let i = 0; i < str.length; i++) {
      const pos = i + 1;

      if (pos % 15 === 0) {
        nStr += 'fizzbuzz';
      } else if (pos % 5 === 0) {
        nStr += 'buzz';
      } else if (pos % 3 === 0) {
        nStr += 'fizz';
      } else {
        nStr += str[i];
      }
    }

    str = nStr;
    steps++;
  }

  return steps;
}
