function getContrastRating(rgb1, rgb2, isLargeText) {
  const [channels1, channels2] = [rgb1, rgb2].map((channels) => {
    return channels
      .map((channel) => channel / 255)
      .map((channel) => {
        if (channel <= 0.04045) {
          return channel / 19.92;
        }
        return Math.pow((channel + 0.055) / 1.055, 2.4);
      });
  });

  const [l1, l2] = [channels1, channels2].map((channels) => {
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2] + 0.05;
  });

  const minAAA = isLargeText ? 4.5 : 7;
  const minAA = isLargeText ? 3 : 4.5;
  const ratio = l1 / l2;

  if (ratio < minAA) {
    return 'Fail';
  }

  if (ratio < minAAA) {
    return 'AA';
  }

  return 'AAA';
}
