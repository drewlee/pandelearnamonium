function parseLink(markdown) {
  const textRegEx = /\[(.+)\]/;
  const urlRegEx = /\((.+)\)/;

  const textMatches = markdown.match(textRegEx);
  const urlMatches = markdown.match(urlRegEx);

  if (textMatches && urlMatches) {
    const text = textMatches[1];
    const url = urlMatches[1];

    return `<a href="${url}">${text}</a>`;
  }

  return null;
}
