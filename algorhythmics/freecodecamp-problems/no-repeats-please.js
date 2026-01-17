function permAlone(str) {
  if (str.length === 1) {
    return 1;
  }

  const regExp = /(\w)\1+/;
  const repMatch = str.match(regExp);

  if (repMatch && repMatch[0] === str) {
    return 0;
  }

  const perms = [];

  function getPerms(str, length) {
    if (length === 1) {
      perms.push(str);
    }

    for (let i = 0; i < length; i++) {
      const subStr = str.slice(0, i) + str.slice(i + 1) + str[i];
      getPerms(subStr, length - 1);
    }
  }

  getPerms(str, str.length);

  const nonRepPerms = perms.filter((str) => !regExp.test(str));

  return nonRepPerms.length;
}

permAlone('abc');
