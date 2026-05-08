const DAY_MINS = 24 * 60;
const FOUR_HRS = 4 * 60;
const schedule = new Map([
  [7 * 60, 'Debuggamanizole'],
  [8 * 60, 'Deployxitrin'],
  [13 * 60, 'Debuggamanizole'],
  [16 * 60, 'Deployxitrin'],
  [21 * 60, 'Debuggamanizole'],
]);

function medicationReminder(medications, currentTime) {
  const [currHr, currMn] = currentTime.split(':').map((val) => Number(val));
  const currMins = currHr * 60 + currMn;

  let nextScheduled = (currHr * 60 + 60) % DAY_MINS;
  while (!schedule.has(nextScheduled)) {
    nextScheduled = (nextScheduled + 60) % DAY_MINS;
  }

  let lastMerge = '';
  for (const [med, time] of medications) {
    if (med === 'Mergeflictamine') {
      lastMerge = time;
      break;
    }
  }

  if (lastMerge) {
    const [mergeHr, mergeMn] = lastMerge.split(':').map((val) => Number(val));
    const mergeMins = mergeHr * 60 + mergeMn;
    let nextMerge = mergeMins;

    while (nextMerge < currMins) {
      nextMerge = (nextMerge + FOUR_HRS) % DAY_MINS;
    }

    if (nextMerge < nextScheduled) {
      nextMerge = nextMerge < currMins ? nextMerge + DAY_MINS : nextMerge;
      const diff = nextMerge - currMins;
      const hrs = Math.floor(diff / 60);
      const mns = diff % 60;

      return `Mergeflictamine in ${hrs}h ${mns}m`;
    }
  }

  nextScheduled = nextScheduled < currMins ? nextScheduled + DAY_MINS : nextScheduled;
  const diff = nextScheduled - currMins;
  const hrs = Math.floor(diff / 60);
  const mns = diff % 60;

  return `${schedule.get(nextScheduled)} in ${hrs}h ${mns}m`;
}
