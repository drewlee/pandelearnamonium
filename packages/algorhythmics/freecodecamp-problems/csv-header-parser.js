function getHeadings(csv) {
  let cells = csv.split(',');
  cells = cells.map((cell) => cell.trim());

  return cells;
}
