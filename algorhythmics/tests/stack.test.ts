import Stack from '../src/stack.ts';

test('Creates an instance with defaults', () => {
  const stack = new Stack<null>();

  expect(stack).toBeInstanceOf(Stack);
  expect(stack.top).toBeNull();
  expect(stack.size).toBe(0);
});

test('Pushes a value on to the top of the stack', () => {
  const stack = new Stack<number>();
  const values = [13, 15, 19];

  stack.push(values[0]);
  expect(stack.top?.value).toBe(values[0]);

  stack.push(values[1]);
  expect(stack.top?.value).toBe(values[1]);

  stack.push(values[2]);
  expect(stack.top?.value).toBe(values[2]);
});

test('Pushed values are correctly linked', () => {
  const stack = new Stack<number>();
  const values = [12, 13, 15, 19, 27];

  for (const value of values) {
    stack.push(value);
  }

  let node = stack.top;
  let i = values.length - 1;

  while (node !== null) {
    expect(node.value).toBe(values[i]);
    node = node.next;
    i--;
  }
});

test('Reports whether the stack is empty', () => {
  const stack = new Stack<number>();
  expect(stack.isEmpty()).toBeTruthy();

  stack.push(13);
  expect(stack.isEmpty()).toBeFalsy();

  stack.pop();
  expect(stack.isEmpty()).toBeTruthy();
});

test('Peek returns the top-most value', () => {
  const stack = new Stack<number>();
  let value = 13;

  stack.push(value);
  expect(stack.peek()).toBe(value);

  value = 15;
  stack.push(value);
  expect(stack.peek()).toBe(value);

  value = 19;
  stack.push(value);
  expect(stack.peek()).toBe(value);
});

test('Peek returns `null` for an empty stack', () => {
  const stack = new Stack<null>();
  expect(stack.peek()).toBeNull();
});

test('Pop removes the top-most value', () => {
  const stack = new Stack<number>();
  const values = [13, 15, 19];

  for (const value of values) {
    stack.push(value);
  }

  expect(stack.pop()).toBe(values[2]);
  expect(stack.top?.value).toBe(values[1]);

  expect(stack.pop()).toBe(values[1]);
  expect(stack.top?.value).toBe(values[0]);

  expect(stack.pop()).toBe(values[0]);
  expect(stack.top).toBeNull();
});

test('Pop returns `null` for an empty stack', () => {
  const stack = new Stack<null>();
  expect(stack.pop()).toBeNull();
});

test('Values are correctly linked after popping', () => {
  const stack = new Stack<number>();
  const values = [12, 13, 15, 19, 27];

  for (const value of values) {
    stack.push(value);
  }

  stack.pop(); // 27
  stack.pop(); // 19
  stack.push(values[3]);
  stack.push(values[4]);

  let node = stack.top;
  let i = values.length - 1;

  while (node !== null) {
    expect(node.value).toBe(values[i]);
    node = node.next;
    i--;
  }
});

test('Size property is reported', () => {
  const stack = new Stack<number>();
  const values = [13, 15, 19];

  expect(stack.size).toBe(0);

  stack.push(values[0]);
  expect(stack.size).toBe(1);

  stack.push(values[1]);
  expect(stack.size).toBe(2);

  stack.push(values[2]);
  expect(stack.size).toBe(3);

  stack.pop();
  expect(stack.size).toBe(2);

  stack.pop();
  expect(stack.size).toBe(1);

  stack.pop();
  expect(stack.size).toBe(0);

  stack.pop();
  expect(stack.size).toBe(0);
});
