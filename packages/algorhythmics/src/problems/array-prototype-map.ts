declare global {
  interface Array<T> {
    arrayMap(
      callbackfn: (value: T, index: number, array: T[]) => T,
      thisObj?: unknown,
    ): (T | undefined)[];
  }
}

Array.prototype.arrayMap = function <T>(
  callback: (value: T, index: number, array: T[]) => T,
  thisObj?: unknown,
): (T | undefined)[] {
  if (typeof callback !== 'function') {
    throw new TypeError('Callback is not a function');
  }

  const mapped: (T | undefined)[] = [];

  for (let i = 0; i < this.length; i++) {
    const result = this[i] === undefined ? undefined : callback.call(thisObj, this[i], i, this);

    mapped.push(result);
  }

  return mapped;
};

export {};
