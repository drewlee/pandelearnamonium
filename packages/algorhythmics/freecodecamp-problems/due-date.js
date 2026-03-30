function getDueDate(dateStr) {
  const dt = new Date(dateStr);
  const inputMonth = dt.getUTCMonth();
  dt.setUTCMonth(inputMonth + 9);

  let expectedMonth = inputMonth + 1 + 9;
  if (expectedMonth > 12) {
    expectedMonth -= 12;
  }

  if (dt.getUTCMonth() + 1 > expectedMonth) {
    dt.setUTCDate(dt.getUTCDate() - 1);
  }

  const yr = dt.getUTCFullYear();
  const m = dt.getUTCMonth() + 1;
  const d = dt.getUTCDate();

  const mm = m < 9 ? `0${m}` : String(m);
  const dd = d < 9 ? `0${d}` : String(d);
  const result = `${yr}-${mm}-${dd}`;

  return result;
}
