function capitalize(paragraph) {
  const punct = new Set(['.', '?', '!']);
  let isSentenceStart = true;
  let result = '';

  for (let i = 0; i < paragraph.length; i++) {
    let char = paragraph[i];

    if (isSentenceStart && /[a-z]/.test(char)) {
      isSentenceStart = false;
      char = char.toUpperCase();
    } else if (punct.has(char)) {
      isSentenceStart = true;
    }

    result += char;
  }

  return result;
}
