function getItineraryCount(stops) {
  const itin = new Array(3).fill(null).map(() => new Array());
  const used = new Array(stops.length).fill(false);
  const perms = new Set();

  function getItinPerms(itin, used, perms) {
    let isExhausted = true;

    for (let i = 0; i < stops.length; i++) {
      if (used[i]) {
        continue;
      }

      isExhausted = false;
      used[i] = true;

      for (let j = 0; j < itin.length; j++) {
        itin[j].push(stops[i]);
        getItinPerms(itin, used, perms);
        itin[j].pop();
      }

      used[i] = false;
    }

    if (isExhausted) {
      if (
        itin[0].length >= 1 &&
        itin[1].length >= 1 &&
        itin[2].length <= 1 &&
        !perms.has(JSON.stringify(itin))
      ) {
        perms.add(JSON.stringify(itin));
      }
    }
  }

  getItinPerms(itin, used, perms);

  return perms.size;
}
