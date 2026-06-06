function isValidSchema(obj) {
  if (!('users' in obj) || !Array.isArray(obj.users)) {
    return false;
  }

  if (obj.users.length === 0) {
    return true;
  }

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

  return obj.users.every((currObj) => {
    const isValidReqProps = props.required.every(([name, type]) => {
      return (
        name in currObj &&
        ((type.includes('[]') && isTypeArray(type, currObj[name])) ||
          typeof currObj[name] === type ||
          type.includes(currObj[name]))
      );
    });

    const isValidOptProps = props.optional.every(([name, type]) => {
      return !(name in currObj) || typeof currObj[name] === type;
    });

    return isValidReqProps && isValidOptProps;
  });
}
