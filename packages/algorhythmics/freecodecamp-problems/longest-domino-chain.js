function buildDominoChain(dominoes, used, path) {
  let maxChain = [];

  if (!path.length) {
    for (let i = 0; i < dominoes.length; i++) {
      const domino = dominoes[i];
      used[i] = true;
      path.push(domino);

      const result = buildDominoChain(dominoes, used, path);
      if (result.length > maxChain.length) {
        maxChain = result;
      }

      used[i] = false;
      path.pop();
    }

    return maxChain;
  }

  const lastVal = path[path.length - 1][1];

  for (let i = 0; i < dominoes.length; i++) {
    if (used[i]) {
      continue;
    }

    const domino = dominoes[i];
    const options = [domino];
    if (domino[0] !== domino[1]) {
      options.push([domino[1], domino[0]]);
    }

    for (const face of options) {
      if (lastVal === face[0]) {
        used[i] = true;
        path.push(face);

        const result = buildDominoChain(dominoes, used, path);
        if (result.length > maxChain.length) {
          maxChain = result;
        }

        used[i] = false;
        path.pop();
      }
    }
  }

  if (!maxChain.length) {
    return [...path];
  }

  return maxChain;
}

function getLongestChain(dominoes) {
  const len = dominoes.length;
  const used = new Array(len).fill(false);
  const longest = buildDominoChain(dominoes, used, []);

  return longest;
}
