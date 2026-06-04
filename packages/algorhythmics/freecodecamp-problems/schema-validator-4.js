function isValidSchema(obj) {
  const props = {
    required: [
      ['username', 'string'],
      ['posts', 'number'],
      ['verified', 'boolean'],
      ['role', ['user', 'creator', 'moderator', 'staff', 'admin']],
    ],
    optional: [['supporter', 'boolean']],
  };

  const hasValidReqProps = props.required.every(([name, type]) => {
    return name in obj && (typeof obj[name] === type || type.includes(obj[name]));
  });

  const hasValidOptProps = props.optional.every(([name, type]) => {
    return !(name in obj) || typeof obj[name] === type;
  });

  return hasValidReqProps && hasValidOptProps;
}
