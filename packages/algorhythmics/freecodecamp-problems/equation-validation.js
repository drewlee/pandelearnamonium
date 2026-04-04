function execCalc(a, b, operator) {
  const aNum = Number(a);
  const bNum = Number(b);

  switch (operator) {
    case '/':
      return aNum / bNum;
    case '*':
      return aNum * bNum;
    case '+':
      return aNum + bNum;
    case '-':
      return aNum - bNum;
    default:
      return 0;
  }
}

function isValidEquation(equation) {
  const ops = ['/', '*', '+', '-'];
  const split = equation.split(' ');
  const result = split[split.length - 1];
  let parts = split.slice(0, -2);

  let i = 0;
  while (parts.length > 1) {
    const j = parts.indexOf(ops[i]);

    if (j > -1) {
      const computed = execCalc(parts[j - 1], parts[j + 1], parts[j]);
      parts.splice(j - 1, 3, computed);
    } else {
      i++;
    }
  }

  return parts[0] === Number(result);
}
