import allConstruct from '../../src/dynamic-programming/fcc-all-construct-bu.ts';

test.each([
  // Empty target has one way to be constructed: the empty selection
  ['', ['cat', 'dog', 'mouse'], [[]]],
  // Four distinct ways to construct the target
  [
    'abcdef',
    ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'],
    [
      ['abc', 'def'],
      ['ab', 'c', 'def'],
      ['abcd', 'ef'],
      ['ab', 'cd', 'ef'],
    ],
  ],
  // Two distinct ways — one word reused in the second combination
  [
    'purple',
    ['purp', 'p', 'ur', 'le', 'purpl'],
    [
      ['purp', 'le'],
      ['p', 'ur', 'p', 'le'],
    ],
  ],
  // Two distinct ways — one is a single word match
  ['hello', ['he', 'll', 'o', 'hello'], [['hello'], ['he', 'll', 'o']]],
  // Target cannot be constructed — empty array (not array of empty arrays)
  ['skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'], []],
  ['hello', ['world'], []],
  // Empty word bank — nothing to construct from
  ['hello', [], []],
])('allConstruct(%j, %j)', (target, wordBank, expected) => {
  expect(allConstruct(target, wordBank)).toStrictEqual(expected);
});
