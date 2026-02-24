import Trie from '../src/trie.ts';

test('Creates instance with defaults', () => {
  const trie = new Trie();

  expect(trie).toBeInstanceOf(Trie);
  expect(trie.root).toStrictEqual({
    keys: {},
    isEnd: false,
  });
});

describe('insert', () => {
  test('Inserts a word', () => {
    const values = ['hello'];
    const trie = new Trie();

    trie.insert(values[0]);

    expect(trie.root).toMatchInlineSnapshot(`
      {
        "isEnd": false,
        "keys": {
          "h": {
            "isEnd": false,
            "keys": {
              "e": {
                "isEnd": false,
                "keys": {
                  "l": {
                    "isEnd": false,
                    "keys": {
                      "l": {
                        "isEnd": false,
                        "keys": {
                          "o": {
                            "isEnd": true,
                            "keys": {},
                          },
                        },
                      },
                    },
                  },
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
        "isEnd": false,
        "keys": {
          "h": {
            "isEnd": false,
            "keys": {
              "e": {
                "isEnd": false,
                "keys": {
                  "a": {
                    "isEnd": false,
                    "keys": {
                      "p": {
                        "isEnd": true,
                        "keys": {},
                      },
                    },
                  },
                  "l": {
                    "isEnd": false,
                    "keys": {
                      "l": {
                        "isEnd": false,
                        "keys": {
                          "o": {
                            "isEnd": true,
                            "keys": {},
                          },
                        },
                      },
                      "p": {
                        "isEnd": true,
                        "keys": {},
                      },
                    },
                  },
                },
              },
              "i": {
                "isEnd": true,
                "keys": {
                  "d": {
                    "isEnd": false,
                    "keys": {
                      "e": {
                        "isEnd": true,
                        "keys": {},
                      },
                    },
                  },
                  "n": {
                    "isEnd": false,
                    "keys": {
                      "d": {
                        "isEnd": false,
                        "keys": {
                          "e": {
                            "isEnd": false,
                            "keys": {
                              "r": {
                                "isEnd": true,
                                "keys": {},
                              },
                            },
                          },
                        },
                      },
                    },
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

describe('getWordsRecursive', () => {
  test('Returns all words in trie', () => {
    const values = ['answer', 'heap', 'hello', 'help', 'hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));

    const result = trie.getWordsRecursive();
    expect(result.sort()).toStrictEqual(values);
  });

  test('Returns an empty array when the trie is empty', () => {
    const trie = new Trie();
    const result = trie.getWordsRecursive();

    expect(result).toStrictEqual([]);
  });
});

describe('remove', () => {
  test('Removes a word without affecting sibling words on the same prefix path', () => {
    const values = ['hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));
    trie.remove('hide');

    expect(trie.getWords().sort()).toStrictEqual(['hi', 'hinder']);
  });

  test('Removes a word that is a prefix of other words without removing descendants', () => {
    const values = ['car', 'card', 'care'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));
    trie.remove('car');

    expect(trie.getWords().sort()).toStrictEqual(['card', 'care']);
  });

  test('Removes a word not shared with a common prefix', () => {
    const values = ['answer', 'car', 'hello'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));
    trie.remove('car');

    expect(trie.getWords().sort()).toStrictEqual(['answer', 'hello']);
  });

  test('Remove is a no-op when the word to delete is not in the trie', () => {
    const values = ['hi', 'hide', 'hinder'];
    const trie = new Trie();

    values.forEach((value) => trie.insert(value));
    trie.remove('hip');

    expect(trie.getWords().sort()).toStrictEqual(values);
  });
});
