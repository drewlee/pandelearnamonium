import Queue from '../src/queue.ts';

test('Creates an instance with defaults', () => {
  const queue = new Queue<null>();

  expect(queue).toBeInstanceOf(Queue);
  expect(queue.head).toBeNull();
  expect(queue.tail).toBeNull();
  expect(queue.size).toBe(0);
});

test('Enqueues a value into the queue', () => {
  const queue = new Queue<number>();
  const value = 13;

  queue.enqueue(value);
  expect(queue.tail?.value).toBe(value);
});

test('Enqueued values are set to the tail', () => {
  const queue = new Queue<number>();
  const values = [13, 15, 19];

  queue.enqueue(values[0]);

  // Head and tail point to the same node
  // when there is only 1 node in the queue
  expect(queue.head?.value).toBe(values[0]);
  expect(queue.tail?.value).toBe(values[0]);

  queue.enqueue(values[1]);

  expect(queue.head?.value).toBe(values[0]);
  expect(queue.tail?.value).toBe(values[1]);

  queue.enqueue(values[2]);

  expect(queue.head?.value).toBe(values[0]);
  expect(queue.tail?.value).toBe(values[2]);
});

test('Enqueued values are correctly linked', () => {
  const queue = new Queue<number>();
  const values = [12, 13, 15, 19, 27];

  for (const value of values) {
    queue.enqueue(value);
  }

  let node = queue.head;
  let i = 0;

  while (node !== null) {
    expect(node.value).toBe(values[i]);
    node = node.next;
    i++;
  }
});

test('Peek returns the front-most value', () => {
  const queue = new Queue<number>();
  const values = [13, 15, 19];

  for (const value of values) {
    queue.enqueue(value);
  }

  expect(queue.peek()).toBe(values[0]);
});

test('Peek returns `null` for an empty queue', () => {
  const queue = new Queue<null>();
  expect(queue.peek()).toBeNull();
});

test('Dequeues the front-most value from the queue', () => {
  const queue = new Queue<number>();
  const value = 13;

  queue.enqueue(value);
  const result = queue.dequeue();

  expect(result).toBe(value);
  expect(queue.head).toBeNull();
  expect(queue.tail).toBeNull();
});

test('Values to dequeue are set to the head', () => {
  const queue = new Queue<number>();
  const values = [13, 15, 19];

  for (const value of values) {
    queue.enqueue(value);
  }

  queue.dequeue();
  expect(queue.head?.value).toBe(values[1]);
  expect(queue.tail?.value).toBe(values[2]);

  queue.dequeue();
  // Head and tail point to the same node
  // when there is only 1 node in the queue
  expect(queue.head?.value).toBe(values[2]);
  expect(queue.tail?.value).toBe(values[2]);

  queue.dequeue();
  expect(queue.head).toBeNull();
  expect(queue.tail).toBeNull();
});

test('Values are correctly linked after dequeueing', () => {
  const queue = new Queue<number>();
  const values = [12, 13, 15, 19, 27];

  for (const value of values) {
    queue.enqueue(value);
  }

  queue.dequeue(); // 12
  queue.dequeue(); // 13
  queue.enqueue(values[0]);
  queue.enqueue(values[1]);

  const expectedValues = [...values.slice(2), ...values.slice(0, 2)];

  let node = queue.head;
  let i = 0;

  while (node !== null) {
    expect(node.value).toBe(expectedValues[i]);
    node = node.next;
    i++;
  }
});

test('Dequeue returns `null` for an empty queue', () => {
  const queue = new Queue<null>();
  expect(queue.dequeue()).toBeNull();
});

test('Reports whether the queue is empty', () => {
  const queue = new Queue<number>();
  expect(queue.isEmpty()).toBeTruthy();

  queue.enqueue(13);
  expect(queue.isEmpty()).toBeFalsy();

  queue.dequeue();
  expect(queue.isEmpty()).toBeTruthy();
});

test('Size property is reported correctly', () => {
  const queue = new Queue<number>();
  const values = [13, 15, 19];

  expect(queue.size).toBe(0);

  queue.enqueue(values[0]);
  expect(queue.size).toBe(1);

  queue.enqueue(values[1]);
  expect(queue.size).toBe(2);

  queue.enqueue(values[2]);
  expect(queue.size).toBe(3);

  queue.dequeue();
  expect(queue.size).toBe(2);

  queue.dequeue();
  expect(queue.size).toBe(1);

  queue.dequeue();
  expect(queue.size).toBe(0);

  queue.dequeue();
  expect(queue.size).toBe(0);
});
