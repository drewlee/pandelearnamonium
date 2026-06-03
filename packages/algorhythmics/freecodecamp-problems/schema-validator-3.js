function isValidSchema(obj) {
  const roles = new Set(['user', 'creator', 'moderator', 'staff', 'admin']);
  const props = [
    ['username', 'string'],
    ['posts', 'number'],
    ['verified', 'boolean'],
    ['role', roles],
  ];

  return props.every(([name, type]) => {
    return (
      name in obj && (typeof obj[name] === type || (type instanceof Set && type.has(obj[name])))
    );
  });
}
