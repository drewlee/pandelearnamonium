function stripTags(html) {
  const pattern = /<.+?>/g;
  const result = html.replace(pattern, '');
  return result;
}
