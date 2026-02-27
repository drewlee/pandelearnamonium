import { PubSub } from '../index.js';

afterEach(() => {
  PubSub.off();
});

describe('PubSub', () => {
  test('Object is defined', () => {
    expect(PubSub).toBeTypeOf('object');
  });

  test('Has the expected enumerable properties', () => {
    const result = [];

    for (const prop in PubSub) {
      result.push(prop);
    }

    expect(result).toStrictEqual(['on', 'off', 'trigger']);
  });
});

describe('PubSub.on', () => {
  test('Registers and triggers an event listener', () => {
    const listener = vi.fn();

    PubSub.on('foo', listener);
    PubSub.trigger('foo');

    expect(listener).toHaveBeenCalledOnce();
  });

  test('Registers and triggers an event listener using an object param', () => {
    const listener = vi.fn();

    PubSub.on({ foo: listener });
    PubSub.trigger('foo');

    expect(listener).toHaveBeenCalledOnce();
  });

  test('Registers and triggers multiple event listeners using an object param', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const listener3 = vi.fn();

    PubSub.on({
      foo: listener1,
      bar: listener2,
      baz: listener3,
    });
    PubSub.trigger('foo');
    PubSub.trigger('bar');
    PubSub.trigger('baz');

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledOnce();
    expect(listener3).toHaveBeenCalledOnce();
  });

  test('Registers and triggers multiple event listeners using and object param for a single type', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const listener3 = vi.fn();

    PubSub.on({ foo: [listener1, listener2, listener3] });
    PubSub.trigger('foo');

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledOnce();
    expect(listener3).toHaveBeenCalledOnce();
  });

  test('Specifying an invalid `type` param throws an error', () => {
    // @ts-ignore
    expect(() => PubSub.on(123, () => {})).toThrowError();
  });

  test('Specifying an invalid `listener` param throws an error', () => {
    // @ts-ignore
    expect(() => PubSub.on('foo', 'bar')).toThrowError();
  });

  test('Specifying an invalid `listener` param via an object throws an error', () => {
    // @ts-ignore
    expect(() => PubSub.on({ foo: 123 })).toThrowError();
  });

  test('Specifying an invalid `listener` param via an array throws an error', () => {
    // @ts-ignore
    expect(() => PubSub.on({ foo: [123] })).toThrowError();
  });
});

describe('PubSub.off', () => {
  test('Un-registers a listener', () => {
    const listener = vi.fn();

    PubSub.on('foo', listener);
    PubSub.trigger('foo');

    PubSub.off('foo', listener);
    PubSub.trigger('foo');

    expect(listener).toHaveBeenCalledOnce();
  });

  test("Un-registers all listeners for a type if one hasn't been specified", () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const listener3 = vi.fn();

    PubSub.on({ foo: [listener1, listener2, listener3] });
    PubSub.trigger('foo');

    PubSub.off('foo');
    PubSub.trigger('foo');

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledOnce();
    expect(listener3).toHaveBeenCalledOnce();
  });

  test('Un-registers all listeners when calling `off` without params', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const listener3 = vi.fn();

    PubSub.on({
      foo: listener1,
      bar: listener2,
      baz: listener3,
    });
    PubSub.trigger('foo');
    PubSub.trigger('bar');
    PubSub.trigger('baz');

    PubSub.off();

    PubSub.trigger('foo');
    PubSub.trigger('bar');
    PubSub.trigger('baz');

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledOnce();
    expect(listener3).toHaveBeenCalledOnce();
  });

  test('Specifying an invalid `type` param throws an error', () => {
    // @ts-ignore
    expect(() => PubSub.off(123)).toThrowError();
  });
});

describe('PubSub.trigger', () => {
  test('Triggering an unregistered event type has no effect', () => {
    const result = PubSub.trigger('foo');
    expect(result).toStrictEqual([]);
  });

  test('Trigger a listener multiple times', () => {
    const listener = vi.fn();

    PubSub.on('foo', listener);

    PubSub.trigger('foo');
    PubSub.trigger('foo');
    PubSub.trigger('foo');

    expect(listener).toHaveBeenCalledTimes(3);
  });

  test('Triggers multiple listeners', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const listener3 = vi.fn();

    PubSub.on('foo', listener1);
    PubSub.on('foo', listener2);
    PubSub.on('foo', listener3);

    PubSub.trigger('foo');

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledOnce();
    expect(listener3).toHaveBeenCalledOnce();
  });

  test('Pass in arguments to the listener via `trigger`', () => {
    const listener = vi.fn();

    PubSub.on('foo', listener);
    PubSub.trigger('foo', 'bar', 362);
    PubSub.off('foo', listener);

    expect(listener).toHaveBeenCalledWith('bar', 362);
  });

  test("The `trigger` function returns the listener's return value", () => {
    const listener = vi.fn().mockImplementation(() => 362);

    PubSub.on('foo', listener);

    const result = PubSub.trigger('foo');

    expect(result).toStrictEqual([362]);
  });

  test("The `trigger` function returns all listeners' return values", () => {
    const listener1 = vi.fn().mockImplementation(() => 362);
    const listener2 = vi.fn().mockImplementation(() => 'bar');
    const listener3 = vi.fn().mockImplementation(() => null);

    PubSub.on('foo', listener1);
    PubSub.on('foo', listener2);
    PubSub.on('foo', listener3);

    const result = PubSub.trigger('foo');

    expect(result).toStrictEqual([362, 'bar', null]);
  });

  test('Specifying an invalid `type` param throws an error', () => {
    // @ts-ignore
    expect(() => PubSub.trigger(123)).toThrowError();
  });
});
