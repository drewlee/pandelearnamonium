function scaleImage(size, scale) {
  const newSize = size
    .split('x') // Split values to array
    .map((value) => Number(value)) // Convert to number
    .map((value) => value * scale) // Compute to scale
    .join('x'); // Convert array back to string

  return newSize;
}
