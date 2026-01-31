import Trie from '../src/trie.ts';

test('Creates instance with defaults', () => {
  const trie = new Trie();

  expect(trie).toBeInstanceOf(Trie);
  expect(trie.endSymbol).toBe('*');
  expect(trie.root).toStrictEqual({});
});

describe('insert', () => {
  test('Inserts a word', () => {
    const values = ['hello'];
    const trie = new Trie();

    trie.insert(values[0]);

    expect(trie.root).toMatchInlineSnapshot(`
      {
        "h": {
          "e": {
            "l": {
              "l": {
                "o": {
                  "*": true,
                },
              },
            },
          },
        },
      }
    `);
  });

  test('Inserts a series of words', () => {
    const values = ['hello', 'hi', 'help', 'hide', 'hinder', 'heap'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));

    expect(trie.root).toMatchInlineSnapshot(`
      {
        "h": {
          "e": {
            "a": {
              "p": {
                "*": true,
              },
            },
            "l": {
              "l": {
                "o": {
                  "*": true,
                },
              },
              "p": {
                "*": true,
              },
            },
          },
          "i": {
            "*": true,
            "d": {
              "e": {
                "*": true,
              },
            },
            "n": {
              "d": {
                "e": {
                  "r": {
                    "*": true,
                  },
                },
              },
            },
          },
        },
      }
    `);
  });
});

describe('search', () => {
  test('Returns `true` when an existing word is searched', () => {
    const values = ['answer', 'heap', 'hello', 'help', 'hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));

    const result = trie.search('help');
    expect(result).toBeTruthy();
  });

  test('Returns `false` when a non-existing word is searched', () => {
    const values = ['answer', 'heap', 'hello', 'help', 'hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));

    let result = trie.search('hell');
    expect(result).toBeFalsy();

    result = trie.search('he');
    expect(result).toBeFalsy();

    result = trie.search('dog');
    expect(result).toBeFalsy();
  });
});

describe('startsWith', () => {
  test('Returns `true` when a word with the prefix exists', () => {
    const values = ['answer', 'heap', 'hello', 'help', 'hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));

    let result = trie.startsWith('h');
    expect(result).toBeTruthy();

    result = trie.startsWith('he');
    expect(result).toBeTruthy();

    result = trie.startsWith('hel');
    expect(result).toBeTruthy();

    result = trie.startsWith('hi');
    expect(result).toBeTruthy();
  });

  test('Returns `false` when a word with the prefix does not exist', () => {
    const values = ['answer', 'heap', 'hello', 'help', 'hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));

    const result = trie.startsWith('hip');
    expect(result).toBeFalsy();
  });
});

describe('getWordsStartingWith', () => {
  test('Returns list of words for the given prefix', () => {
    const values = ['answer', 'heap', 'hello', 'help', 'hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));

    let result = trie.getWordsStartingWith('hi');
    expect(result.sort()).toStrictEqual(['hi', 'hide', 'hinder']);

    result = trie.getWordsStartingWith('he');
    expect(result.sort()).toStrictEqual(['heap', 'hello', 'help']);

    result = trie.getWordsStartingWith('a');
    expect(result).toStrictEqual(['answer']);
  });

  test('Returns empty array when prefix is not found', () => {
    const values = ['answer', 'heap', 'hello', 'help', 'hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));

    const result = trie.getWordsStartingWith('hip');
    expect(result).toStrictEqual([]);
  });
});

describe('getWords', () => {
  test('Returns all words in trie', () => {
    const values = ['answer', 'heap', 'hello', 'help', 'hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));

    const result = trie.getWords();
    expect(result.sort()).toStrictEqual(values);
  });

  test('Returns an empty array when the trie is empty', () => {
    const trie = new Trie();
    const result = trie.getWords();

    expect(result).toStrictEqual([]);
  });
});
