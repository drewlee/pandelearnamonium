const bingo = 'BINGO';
const ref = [];
const max = 75;

let j = 0;
for (let i = 0; i < max; i++) {
  ref[i] = bingo[j];
  if ((i + 1) % 15 === 0) {
    j++;
  }
}

function getNextBingoNumber(n) {
  const index = Number(n.slice(1)) % max;
  const letter = ref[index];

  return `${letter}${index + 1}`;
}
