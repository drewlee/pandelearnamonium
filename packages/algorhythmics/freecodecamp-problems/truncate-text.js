function truncateText(text) {
  if (text.length > 20) {
    return text.slice(0, 17).concat('...');
  }

  return text;
}
