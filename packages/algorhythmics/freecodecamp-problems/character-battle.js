const LC_BASE = 'a'.charCodeAt(0);
const UC_BASE = 'A'.charCodeAt(0);
const ALPHA_LEN = 26;

function isAlphaLC(code) {
  return code >= LC_BASE && code < LC_BASE + ALPHA_LEN;
}

function isAlphaUC(code) {
  return code >= UC_BASE && code < UC_BASE + ALPHA_LEN;
}

function getScore(char) {
  const code = char.charCodeAt(0);

  if (isAlphaLC(code)) {
    return code - LC_BASE + 1;
  } else if (isAlphaUC(code)) {
    return code - UC_BASE + 27;
  } else if (!Number.isNaN(Number(char))) {
    return Number(char);
  }

  return 0;
}

function battle(myArmy, opposingArmy) {
  const mArmyLen = myArmy.length;
  const oArmyLen = opposingArmy.length;

  if (mArmyLen > oArmyLen) {
    return 'Opponent retreated';
  } else if (mArmyLen < oArmyLen) {
    return 'We retreated';
  }

  let wins = 0;
  let losses = 0;

  for (let i = 0; i < mArmyLen; i++) {
    const mScore = getScore(myArmy[i]);
    const oScore = getScore(opposingArmy[i]);

    if (mScore > oScore) {
      wins++;
    } else if (mScore < oScore) {
      losses++;
    }
  }

  if (wins > losses) {
    return 'We won';
  } else if (wins < losses) {
    return 'We lost';
  }

  return 'It was a tie';
}
