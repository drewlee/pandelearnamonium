function isValidTrick(trickName) {
  const first = new Set([
    'Misty',
    'Ghost',
    'Thunder',
    'Solar',
    'Sky',
    'Phantom',
    'Frozen',
    'Polar',
  ]);
  const second = new Set([
    'Twister',
    'Icequake',
    'Avalanche',
    'Vortex',
    'Snowstorm',
    'Frostbite',
    'Blizzard',
    'Shadow',
  ]);

  const input = trickName.split(' ');
  return first.has(input[0]) && second.has(input[1]);
}
