function emailChainCount(subject) {
  const regExp = /(fwd?|re):/gi;
  const matches = subject.match(regExp);

  if (matches && matches.length) {
    return matches.length;
  }

  return 0;
}
