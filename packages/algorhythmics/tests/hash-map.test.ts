import HashMap from '../src/hash-map.ts';

const DEFAULT_CAPACITY = 9;

test('Creates an instance with defaults', () => {
  const hm = new HashMap<string>();

  expect(hm).toBeInstanceOf(HashMap);
  expect(hm.capacity).toBe(DEFAULT_CAPACITY);
  expect(hm.size()).toBe(0);
});

test('Creates an instance with custom capacity', () => {
  const value = 100;
  const hm = new HashMap<string>(value);

  expect(hm).toBeInstanceOf(HashMap);
  expect(hm.capacity).toBe(value);
});

test('Sets new value', () => {
  const key = 'Florida';
  const value = 'Tallahassee';
  const hm = new HashMap<string>();

  hm.set(key, value);

  expect(hm.get(key)).toBe(value);
  expect(hm.size()).toBe(1);
});

test('Overrides existing value', () => {
  const key = 'Florida';
  const value = 'Tallahassee';
  const hm = new HashMap<string>();

  hm.set(key, value);

  expect(hm.get(key)).toBe(value);
  expect(hm.size()).toBe(1);

  const newValue = 'Jacksonville';
  hm.set(key, newValue);

  expect(hm.get(key)).toBe(newValue);
  expect(hm.size()).toBe(1);
});

test('Does not set value for invalid key', () => {
  const value = 'foo';
  const hm = new HashMap<string>();

  hm.set('', value);
  hm.set('   ', value);
  expect(hm.size()).toBe(0);
});

test('No return value if getting an invalid key', () => {
  const hm = new HashMap<string>();

  expect(hm.get('')).toBeUndefined();
  expect(hm.get('   ')).toBeUndefined();
  expect(hm.get('foo')).toBeUndefined();
});

test('Deletes value for existing key', () => {
  const values = [
    ['Florida', 'Tallahassee'],
    ['Illinois', 'Springfield'],
    ['California', 'Sacramento'],
  ];

  const hm = new HashMap<string>();

  values.forEach(([key, value]) => hm.set(key, value));
  expect(hm.size()).toBe(values.length);

  const result = hm.delete(values[1][0]);

  expect(result).toBe(values[1][1]);
  expect(hm.size()).toBe(values.length - 1);
  expect(hm.get(values[1][0])).toBeUndefined();
});

test('Does not delete values for invalid keys', () => {
  const values = [
    ['Florida', 'Tallahassee'],
    ['Illinois', 'Springfield'],
    ['California', 'Sacramento'],
  ];

  const hm = new HashMap<string>();

  values.forEach(([key, value]) => hm.set(key, value));
  expect(hm.size()).toBe(values.length);

  expect(hm.delete('')).toBeUndefined();
  expect(hm.delete('   ')).toBeUndefined();
  expect(hm.delete('foo')).toBeUndefined();
  expect(hm.size()).toBe(values.length);
});

test('Increases capacity when the load factor is exceeded', () => {
  const values: [string, number][] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((key, idx) => [
    key,
    idx + 1,
  ]);

  const hm = new HashMap<number>();
  expect(hm.capacity).toBe(DEFAULT_CAPACITY);

  values.forEach(([key, value]) => hm.set(key, value));
  expect(hm.capacity, 'Capacity is doubled').toBe(DEFAULT_CAPACITY * 2);
  expect(hm.size()).toBe(values.length);

  const result = values.map((entry) => hm.get(entry[0]));
  const expectedResult = values.map((entry) => entry[1]);
  expect(result, 'Existing key-value pairs are copied').toStrictEqual(expectedResult);
  expect(hm.size(), 'Existing number of key-value pairs is unaffected').toBe(values.length);
});

test('Stores colliding values using linear probing', () => {
  const values = [
    ['za', 'foo'],
    ['bm', 'bar'],
    ['dl', 'baz'],
  ];
  const hm = new HashMap<string>();

  // Set some arbitrary values
  hm.set('a', 'a');
  hm.set('b', 'b');

  values.forEach(([key, value]) => hm.set(key, value));
  expect(hm.size()).toBe(5);

  const results = values.map((value) => hm.get(value[0]));
  const expectedResult = values.map((value) => value[1]);

  expect(results).toStrictEqual(expectedResult);
});

test('Updates existing colliding value', () => {
  const values = [
    ['za', 'foo'],
    ['bm', 'bar'],
    ['dl', 'baz'],
  ];
  const hm = new HashMap<string>();

  // Set some arbitrary values
  hm.set('a', 'a');
  hm.set('b', 'b');

  values.forEach(([key, value]) => hm.set(key, value));

  const newValue = 'oof!';
  hm.set(values[1][0], newValue);

  expect(hm.size()).toBe(5);
  expect(hm.get(values[1][0])).toBe(newValue);
});

test('No return value for a colliding non-existing key', () => {
  const values = [
    ['za', 'foo'],
    ['dl', 'baz'],
  ];
  const hm = new HashMap<string>();

  // Set some arbitrary values
  hm.set('a', 'a');
  hm.set('b', 'b');

  values.forEach(([key, value]) => hm.set(key, value));
  expect(hm.size()).toBe(4);

  const result = hm.get('bm');
  expect(result).toBeUndefined();
});

test('Deletes a colliding key-value', () => {
  const values = [
    ['za', 'foo'],
    ['bm', 'bar'],
    ['dl', 'baz'],
  ];
  const hm = new HashMap<string>();

  // Set some arbitrary values
  hm.set('a', 'a');
  hm.set('b', 'b');

  values.forEach(([key, value]) => hm.set(key, value));
  expect(hm.size()).toBe(5);

  const result = hm.delete(values[1][0]);

  expect(result).toStrictEqual(values[1][1]);
  expect(hm.size()).toBe(4);
  expect(hm.get(values[1][0])).toBeUndefined();
});

test('Does not delete a non-existing colliding key-value', () => {
  const values = [
    ['za', 'foo'],
    ['dl', 'baz'],
  ];
  const hm = new HashMap<string>();

  // Set some arbitrary values
  hm.set('a', 'a');
  hm.set('b', 'b');

  values.forEach(([key, value]) => hm.set(key, value));
  expect(hm.size()).toBe(4);

  const result = hm.delete('bm');

  expect(result).toBeUndefined();
  expect(hm.size()).toBe(4);
});
