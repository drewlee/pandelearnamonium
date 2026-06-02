function isValidSchema(obj) {
  const props = [
    ['username', 'string'],
    ['posts', 'number'],
    ['verified', 'boolean'],
  ];

  return props.every(([name, type]) => {
    return name in obj && typeof obj[name] === type;
  });
}
