const itemsRef = new Map([
  ['bottle', 10],
  ['can', 6],
  ['bag', 8],
  ['tire', 35],
  ['straw', 4],
  ['cardboard', 3],
  ['newspaper', 3],
  ['shoe', 12],
  ['electronics', 25],
  ['battery', 18],
  ['mattress', 38],
]);

function getCleanupScore(items) {
  let totalPoints = 0;
  let bonus = 1;
  let multiplier = 2;

  for (let i = 0; i < items.length; i++) {
    const currItem = items[i];
    let currPoints = 0;

    if (Array.isArray(currItem)) {
      // Handle rare item
      currPoints += currItem[1];
    } else {
      currPoints += itemsRef.get(currItem);

      if (i > 0 && currItem === items[i - 1]) {
        // Handle bonus streak
        currPoints += bonus;
        bonus++;
      } else {
        bonus = 1;
      }
    }

    // Handle every 5th item multiplier
    if ((i + 1) % 5 === 0) {
      currPoints *= multiplier;
      multiplier++;
    }

    totalPoints += currPoints;
  }

  return totalPoints;
}
