import allConstruct from '../../src/dynamic-programming/fcc-all-construct-td.ts';

test.each([
  // Empty target has one way to be constructed: the empty selection
  ['', ['cat', 'dog', 'mouse'], [[]]],
  // Four distinct ways to construct the target
  [
    'abcdef',
    ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'],
    [
      ['ab', 'cd', 'ef'],
      ['ab', 'c', 'def'],
      ['abc', 'def'],
      ['abcd', 'ef'],
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
  ['hello', ['he', 'll', 'o', 'hello'], [['he', 'll', 'o'], ['hello']]],
  // Target cannot be constructed — empty array (not array of empty arrays)
  ['skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'], []],
  ['hello', ['world'], []],
  // Empty word bank — nothing to construct from
  ['hello', [], []],
])('allConstruct(%j, %j)', (target, wordBank, expected) => {
  expect(allConstruct(target, wordBank)).toStrictEqual(expected);
});
