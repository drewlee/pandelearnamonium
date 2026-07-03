function migrateRecord(schema, record) {
  const result = {};

  for (const key in schema) {
    result[key] = schema[key];
  }

  for (const key in record) {
    result[key] = record[key];
  }

  return result;
}
