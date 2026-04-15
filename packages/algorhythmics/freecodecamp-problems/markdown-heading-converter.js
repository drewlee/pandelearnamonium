function convert(heading) {
  heading = heading.trim();

  const regExp = /^(#{1,6})\s+(.+)$/;
  const matches = heading.match(regExp);

  if (!matches) {
    return 'Invalid format';
  }

  const level = matches[1].length;
  const text = matches[2];

  return `<h${level}>${text}</h${level}>`;
}
