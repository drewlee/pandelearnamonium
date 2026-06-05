function isValidSchema(obj) {
  function isTypeArray(type, arr) {
    type = type.slice(0, -2);
    return Array.isArray(arr) && arr.every((value) => typeof value === type);
  }

  const props = {
    required: [
      ['username', 'string'],
      ['posts', 'number'],
      ['verified', 'boolean'],
      ['role', ['user', 'creator', 'moderator', 'staff', 'admin']],
      ['badges', 'string[]'],
    ],
    optional: [['supporter', 'boolean']],
  };

  const isValidReqProps = props.required.every(([name, type]) => {
    return (
      name in obj &&
      ((type.includes('[]') && isTypeArray(type, obj[name])) ||
        typeof obj[name] === type ||
        type.includes(obj[name]))
    );
  });

  const isValidOptProps = props.optional.every(([name, type]) => {
    return !(name in obj) || typeof obj[name] === type;
  });

  return isValidReqProps && isValidOptProps;
}
