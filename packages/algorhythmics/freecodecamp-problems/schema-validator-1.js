function isValidSchema(obj) {
  return 'username' in obj && typeof obj.username === 'string';
}
