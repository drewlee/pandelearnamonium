function getRoommates(people) {
  const groups = new Map();

  for (const { group, name } of people) {
    if (!groups.has(group)) {
      groups.set(group, [[]]);
    }

    const entries = groups.get(group);
    const last = entries[entries.length - 1];

    if (last.length < 2) {
      groups.set(group, [...entries.slice(0, entries.length - 1), [...last, name]]);
    } else {
      groups.set(group, [...entries, [name]]);
    }
  }

  return [...groups.values()].reduce((result, entries) => {
    for (const group of entries) {
      result.push(group.join(' and '));
    }

    return result;
  }, []);
}
