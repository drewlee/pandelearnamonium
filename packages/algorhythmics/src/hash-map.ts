type HashMapStore<T> = ([string, T] | [null, null])[];

/**
 * Hash maps store key-value pairs for efficient data retrieval. Assignments and retrievals are
 * typically O(1) operations, but can degrade to O(n) if there are too many value collisions.
 */
export default class HashMap<T> {
  private _capacity: number;
  private _size: number;
  private store: HashMapStore<T>;

  get capacity(): number {
    return this._capacity;
  }

  constructor(capacity = 9) {
    this._capacity = capacity;
    this._size = 0;
    this.store = new Array(capacity).fill(null).map(() => [null, null]);
  }

  /**
   * A very naive hashing function. For demo purposes only. The hashed key is used
   * as the index for inserting the key-value pair into the storage array.
   *
   * @param key - Key to hash.
   * @returns The hashed key.
   */
  private getHash(key: string): number {
    let sum = 0;

    for (let i = 0; i < key.length; i++) {
      const num = key[i].charCodeAt(0);
      sum += num * (i + 1);
    }

    return sum % this.capacity;
  }

  /**
   * Determines whether the load factor has been exceeded for the hash map.
   *
   * @returns Boolean for whether the load factor has been exceed.
   */
  private isLoadFactorExceeded(): boolean {
    const loadFactorMax = 0.7;
    const loadFactor = this.size() / this.store.length;

    return loadFactor > loadFactorMax;
  }

  /**
   * Increases the capacity of the storage array once the load factor has exceeded.
   */
  private increaseCapacity(): void {
    const oldStore = this.store;

    this._capacity *= 2;
    this.store = new Array(this._capacity).fill(null).map(() => [null, null]);

    for (const [key, value] of oldStore) {
      if (key !== null) {
        this.insertKeyValue(key, value);
      }
    }
  }

  /**
   * Inserts the specified key-value pair into the hash map. If the key already exists, the
   * associated value is updated. Returns `true` if the key-value pair was inserted, and `false`
   * if it was only updated.
   *
   * @param key - Accessor key.
   * @param value - Value to store.
   * @param indexParam - Optional index to insert at.
   * @returns Boolean for whether the operation was a new insertion vs an update.
   */
  private insertKeyValue(key: string, value: T, indexParam?: number): boolean {
    const index = indexParam ?? this.getHash(key);
    const storedKey = this.store[index][0];

    if (storedKey === null) {
      // No entry at this index - new insertion
      this.store[index] = [key, value];
      return true;
    } else if (storedKey === key) {
      // Key exists at this index - update its value
      this.store[index][1] = value;
    } else {
      // Non-matching key exists at this index - handle collision
      console.log('Set collision for key:', key);

      // Linear probing for an entry with a matching key, or the next available empty slot
      let currIndex = index;

      do {
        const storedKey = this.store[currIndex][0];

        if (storedKey === key || storedKey === null) {
          return this.insertKeyValue(key, value, currIndex);
        }

        currIndex = (currIndex + 1) % this.store.length;
      } while (currIndex !== index);
    }

    return false;
  }

  /**
   * Uses linear probing to find the index of the matching key in case of a collision.
   *
   * @param startIdx - Index to start searching from.
   * @param key - Accessor key.
   * @returns Numeral index of the location of the key. `-1` if the key doesn't exist.
   */
  private probeIndexForKey(startIdx: number, key: string): number {
    let currIndex = startIdx;

    do {
      currIndex = (currIndex + 1) % this.store.length;

      if (this.store[currIndex][0] === key) {
        return currIndex;
      }
    } while (currIndex !== startIdx);

    return -1;
  }

  /**
   * Retrieves the index of the location of the entry associated with the specified key.
   *
   * @param key - Accessor key.
   * @param caller - Function caller, used for test logging.
   * @returns Numeral index of the location of the entry. `-1` if the key doesn't exist.
   */
  private getIndexForKey(key: string, caller: 'Get' | 'Delete'): number {
    let index = this.getHash(key);
    const storedKey = this.store[index][0];

    // No key exists at this index
    if (storedKey === null) {
      return -1;
    }

    // Non-matching key exists at this index - handle collision
    if (storedKey !== key) {
      console.log(caller, 'collision for key:', key);

      const foundIndex = this.probeIndexForKey(index, key);
      index = foundIndex;
    }

    return index;
  }

  /**
   * Returns the number of key-value pairs stored in the hash map.
   *
   * @returns Number of stored key-value pairs.
   */
  size(): number {
    return this._size;
  }

  /**
   * Adds a new key-value pair to the hash map.
   *
   * @param key - Key accessor.
   * @param value - Value to store.
   */
  set(key: string, value: T): void {
    if (!key.trim()) {
      return;
    }

    const isNewKeyValue = this.insertKeyValue(key, value);
    if (isNewKeyValue) {
      this._size++;
    }

    const isLoadExceeded = this.isLoadFactorExceeded();
    if (isLoadExceeded) {
      this.increaseCapacity();
    }
  }

  /**
   * Retrieves the value associated with the specified key.
   * Returns `undefined` if the key does not exist in the hash map.
   *
   * @param key - Accessor key.
   * @returns The value or `undefined`.
   */
  get(key: string): T | undefined {
    if (!key.trim()) {
      return;
    }

    const index = this.getIndexForKey(key, 'Get');
    if (index > -1) {
      return this.store[index][1]!;
    }
  }

  /**
   * Deletes the entry associated with the specified key and returns its value.
   * Returns `undefined` if the key does not exist in the hash map.
   *
   * @param key - Accessor key.
   * @returns The deleted value or `undefined`.
   */
  delete(key: string): T | undefined {
    if (!key.trim()) {
      return;
    }

    const index = this.getIndexForKey(key, 'Delete');

    if (index > -1) {
      const value = this.store[index][1]!;
      this.store[index] = [null, null];
      this._size--;

      return value;
    }
  }
}
