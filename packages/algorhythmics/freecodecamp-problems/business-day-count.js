function getUTCDateInst(dateStr) {
  const [year, month, date] = dateStr.split('-');
  const dt = new Date();
  dt.setUTCFullYear(Number(year));
  dt.setUTCMonth(Number(month) - 1);
  dt.setUTCDate(Number(date));

  return dt;
}

function countBusinessDays(start, end) {
  const startDt = getUTCDateInst(start);
  const endDt = getUTCDateInst(end);
  let count = 0;
  let current = startDt;

  while (current <= endDt) {
    const day = current.getUTCDay();
    if (day > 0 && day < 6) {
      count++;
    }

    current.setUTCDate(current.getUTCDate() + 1);
  }

  return count;
}
