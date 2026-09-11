function isValidNonogram(clue, cells) {
  const len = cells.length;
  let idx = 0;

  for (const num of clue) {
    if (idx > 0 && idx < len && cells[idx] !== 0) {
      return false;
    }

    while (cells[idx] === 0 && idx < len) {
      idx++;
    }

    const end = idx + num;

    while (idx < end) {
      if (idx === len || cells[idx] === 0) {
        return false;
      }
      idx++;
    }
  }

  if (cells.slice(idx).includes(1)) {
    return false;
  }

  return true;
}
