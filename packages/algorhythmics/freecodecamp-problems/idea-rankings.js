function analyzeIdeas(ideas) {
  const expected = ideas.map(([name, opti, real, pesi]) => {
    const value = ((opti + 4 * real + pesi) / 6) * name.length;
    return [name, value];
  });

  expected.sort((a, b) => a[1] - b[1]);

  return expected.map(([name]) => name);
}
