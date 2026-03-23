const convBytes = new Map([
  ['GB', 1_000_000_000],
  ['MB', 1_000_000],
  ['KB', 1000],
  ['B', 1],
]);

function numberOfFiles(fileSize, fileUnit, driveSizeGb) {
  const driveSizeBytes = driveSizeGb * convBytes.get('GB');
  const fileSizeBytes = fileSize * convBytes.get(fileUnit);
  const result = Math.floor(driveSizeBytes / fileSizeBytes);

  return result;
}
