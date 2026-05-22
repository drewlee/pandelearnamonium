function getMeetingTime(availability) {
  const aLen = availability.length;
  let timeSlots = availability[0];

  for (let i = 1; i < aLen; i++) {
    const currAvail = availability[i];
    const mergedAvail = [];

    // Merge overlapping time frames
    for (let j = 0; j < currAvail.length; j++) {
      if (j > 0 && currAvail[j][0] < mergedAvail[mergedAvail.length - 1][1]) {
        mergedAvail[mergedAvail.length - 1][1] = Math.max(
          mergedAvail[mergedAvail.length - 1][1],
          currAvail[j][1],
        );
      } else {
        mergedAvail.push(currAvail[j]);
      }
    }

    const concated = [...timeSlots, ...mergedAvail];
    const merged = [];
    concated.sort((a, b) => a[0] - b[0]);

    for (let j = 1; j < concated.length; j++) {
      if (concated[j][0] < concated[j - 1][1]) {
        merged.push([
          Math.max(concated[j][0], concated[j - 1][0]),
          Math.min(concated[j][1], concated[j - 1][1]),
        ]);
      }
    }

    timeSlots = merged;
  }

  if (timeSlots.length) {
    return timeSlots[0][0];
  }

  return 'None';
}
