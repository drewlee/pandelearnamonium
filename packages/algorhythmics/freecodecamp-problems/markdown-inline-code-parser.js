function parseInlineCode(markdown) {
  /*
  // Solution using regular expression
  const regEx = /`([^`]+)`/g;
  const result = markdown.replace(regEx, (match) => {
    return `<code>${match.slice(1, match.length - 1)}</code>`;
  });
  */

  // Solution using iteration
  let isOpen = false;
  let result = '';

  for (let i = 0; i < markdown.length; i++) {
    const char = markdown[i];

    if (char === '`') {
      const tag = isOpen ? '</code>' : '<code>';

      isOpen = !isOpen;
      result += tag;
    } else {
      result += char;
    }
  }

  return result;
}
