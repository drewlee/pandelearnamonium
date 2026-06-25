function parseFrontmatter(str) {
  const out = {};
  let lines = str.split('\n');
  lines = lines.slice(1, lines.length - 1);

  for (const line of lines) {
    const [key, value] = line.split(': ');
    let tValue = value;

    if (!Number.isNaN(Number(value))) {
      tValue = Number(value);
    } else if (value === 'true') {
      tValue = true;
    } else if (value === 'false') {
      tValue = false;
    }

    out[key] = tValue;
  }

  return out;
}
