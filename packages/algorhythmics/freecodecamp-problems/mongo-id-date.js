function mongoIdToDate(id) {
  const hex = id.slice(0, 8);
  const ts = Number(`0x${hex}`);
  const dt = new Date(ts * 1000);

  return dt.toISOString();
}
