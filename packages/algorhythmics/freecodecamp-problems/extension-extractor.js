function getExtension(filename) {
  const parts = filename.split('.');
  const last = parts[parts.length - 1];

  if (!last || last === filename) {
    return 'none';
  }

  return last;
}
