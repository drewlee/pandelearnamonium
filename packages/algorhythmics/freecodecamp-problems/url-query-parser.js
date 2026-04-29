function parseUrlQuery(url) {
  const params = {};
  const qIdx = url.indexOf('?');

  if (qIdx === -1) {
    return params;
  }

  const query = url.slice(qIdx + 1);
  const pairs = query.split('&');

  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    params[key] = value;
  }

  return params;
}
