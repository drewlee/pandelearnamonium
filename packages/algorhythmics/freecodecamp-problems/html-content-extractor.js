function extractContent(html) {
  const regExp = /<\/*.+?>/g;
  const result = html.replace(regExp, '');

  return result;
}
