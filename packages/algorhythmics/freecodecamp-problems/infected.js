function infected(days) {
  let total = 1;

  for (let i = 1; i <= days; i++) {
    total *= 2;

    if (i % 3 === 0) {
      const patched = Math.ceil(total * 0.2);
      total -= patched;
    }
  }

  return total;
}
