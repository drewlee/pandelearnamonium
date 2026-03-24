const vidUnits = new Map([
  ['B', 1],
  ['KB', 1000],
  ['MB', 1_000_000],
  ['GB', 1_000_000_000],
]);
const driveUnits = new Map([
  ['GB', 1_000_000_000],
  ['TB', 1_000_000_000_000],
]);

function numberOfVideos(videoSize, videoUnit, driveSize, driveUnit) {
  if (!vidUnits.has(videoUnit)) {
    return 'Invalid video unit';
  }

  if (!driveUnits.has(driveUnit)) {
    return 'Invalid drive unit';
  }

  const result = Math.floor(
    (driveSize * driveUnits.get(driveUnit)) / (videoSize * vidUnits.get(videoUnit)),
  );

  return result;
}
