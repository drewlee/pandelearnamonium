function isFizzBuzz(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number') {
      if (arr[i] % 3 === 0 || arr[i] % 5 === 0) {
        return false;
      }
    }

    if (typeof arr[i] === 'string') {
      let num;

      if (i > 0) {
        num = arr[i - 1] + 1;
      } else {
        let j = 0;
        while (typeof arr[j] !== 'number') {
          j++;
        }

        num = arr[j] - j;
      }

      if (
        (arr[i] === 'Fizz' && num % 3 > 0) ||
        (arr[i] === 'Buzz' && num % 5 > 0) ||
        (arr[i] === 'FizzBuzz' && num % 3 > 0 && num % 5 > 0)
      ) {
        return false;
      }

      arr[i] = num;
    }
  }

  return true;
}
