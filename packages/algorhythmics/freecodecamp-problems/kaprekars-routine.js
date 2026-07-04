function kaprekar(n) {
  let count = 0;

  while (n !== 6174) {
    const nArr = n.toString().split('');
    const descArr = [...nArr].sort((a, b) => {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      }
      return 0;
    });
    const ascArr = [...nArr].sort();
    const desc = Number(descArr.join(''));
    const asc = Number(ascArr.join(''));

    n = desc - asc;

    count++;
  }

  return count;
}
