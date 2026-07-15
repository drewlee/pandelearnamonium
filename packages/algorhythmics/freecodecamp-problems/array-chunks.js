function chunkArray(arr, size) {
  const len = arr.length;
  const chunks = [];
  let chunk = [];

  for (let i = 0; i < len; i++) {
    chunk.push(arr[i]);

    if (chunk.length === size || i === len - 1) {
      chunks.push(chunk);
      chunk = [];
    }
  }

  return chunks;
}
