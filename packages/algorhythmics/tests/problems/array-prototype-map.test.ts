import '../../src/problems/array-prototype-map.ts';

describe('Array.prototype.arrayMap', () => {
  it('should return an array with the result of calling the callback function on each element of the original array', () => {
    const arr = [1, 2, 3];
    const callback = vi.fn((x) => x * 2);
    const result = arr.arrayMap(callback);

    expect(result).toEqual([2, 4, 6]);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(1, 0, arr);
    expect(callback).toHaveBeenCalledWith(2, 1, arr);
    expect(callback).toHaveBeenCalledWith(3, 2, arr);
  });

  it('should allow specifying this value for the callback function', () => {
    const arr = [1, 2, 3];
    const thisObj: Record<string, string> = { foo: 'bar' };
    const callback = vi.fn(function (this: Record<string, string>, x: number): number {
      return x;
    });

    arr.arrayMap(callback, thisObj);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(1, 0, arr);
    expect(callback).toHaveBeenCalledWith(2, 1, arr);
    expect(callback).toHaveBeenCalledWith(3, 2, arr);
    expect(callback.mock.instances[0]).toBe(thisObj);
    expect(callback.mock.instances[1]).toBe(thisObj);
    expect(callback.mock.instances[2]).toBe(thisObj);
  });

  it('should return an array with the same length as the original array', () => {
    const arr = [1, 2, 3];
    const callback = vi.fn((x) => x * 2);
    const result = arr.arrayMap(callback);
    expect(result).toHaveLength(3);
  });

  it('should pass the index and the array to the callback as arguments', () => {
    const arr = [1, 2, 3];
    const callback = vi.fn((x) => x * 2);
    arr.arrayMap(callback);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(1, 0, arr);
    expect(callback).toHaveBeenCalledWith(2, 1, arr);
    expect(callback).toHaveBeenCalledWith(3, 2, arr);
  });

  it('should ignore empty indexes in the original array', () => {
    const arr = [1, 2, undefined, 4];
    const callback = vi.fn((x) => x * 2);
    const result = arr.arrayMap(callback);
    expect(result).toEqual([2, 4, undefined, 8]);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(1, 0, arr);
    expect(callback).toHaveBeenCalledWith(2, 1, arr);
    expect(callback).toHaveBeenCalledWith(4, 3, arr);
  });

  it('should throw if first argument is not a function', () => {
    const arr = [1, 2, 3];
    // @ts-expect-error Assert output when the first argument is not a function
    expect(() => arr.arrayMap('not a function')).toThrow(TypeError);
  });
});
