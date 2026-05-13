import HeapItem from '../src/heap-item.ts';

test('Creates an instance with a numeric value, defaulting priority to value', () => {
  const value = 42;
  const heapItem = new HeapItem(value);

  expect(heapItem).toBeInstanceOf(HeapItem);
  expect(heapItem.value).toBe(value);
  expect(heapItem.priority).toBe(value);
});

test('Creates an instance with a string value, defaulting priority to value', () => {
  const value = 'task';
  const heapItem = new HeapItem(value);

  expect(heapItem.value).toBe(value);
  expect(heapItem.priority).toBe(value);
});

test('Creates an instance with an explicit numeric priority', () => {
  const value = 'high priority item';
  const priority = 1;
  const heapItem = new HeapItem(value, priority);

  expect(heapItem.value).toBe(value);
  expect(heapItem.priority).toBe(priority);
});

test('Can update the value and priority properties', () => {
  const heapItem = new HeapItem('initial', 10);

  heapItem.value = 'updated';
  heapItem.priority = 5;

  expect(heapItem.value).toBe('updated');
  expect(heapItem.priority).toBe(5);
});
