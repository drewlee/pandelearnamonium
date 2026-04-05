function extractAttributes(element) {
  const results = [];
  const pattern = /\b[a-z]+="[a-z0-9_-\s]+"/gi;
  const matches = element.match(pattern);

  if (matches === null) {
    return results;
  }

  for (const match of matches) {
    const [name, value] = match.split('=');
    const entry = `${name}, ${value.slice(1, -1)}`;

    results.push(entry);
  }

  return results;
}
