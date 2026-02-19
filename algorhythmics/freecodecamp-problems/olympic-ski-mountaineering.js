function avalancheRisk(snowDepth, slope) {
  const depthMap = new Map([
    ['Shallow', 0],
    ['Moderate', 1],
    ['Deep', 2],
  ]);
  const slopeMap = new Map([
    ['Gentle', 0],
    ['Steep', 1],
    ['Very Steep', 2],
  ]);
  const matrix = [
    ['Safe', 'Safe', 'Safe'],
    ['Safe', 'Risky', 'Risky'],
    ['Safe', 'Risky', 'Risky'],
  ];

  return matrix[slopeMap.get(slope)][depthMap.get(snowDepth)];
}
