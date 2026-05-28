import countConstruct from '../../src/dynamic-programming/fcc-count-construct-td.ts';

test.each([
  // Empty target has exactly one way to be constructed (the empty selection)
  ['', ['cat', 'dog', 'mouse'], 1],
  // Only one combination reaches the target
  ['abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'], 1],
  // Two distinct combinations reach the target (purp+le and p+ur+p+le)
  ['purple', ['purp', 'p', 'ur', 'le', 'purpl'], 2],
  // Multiple words and overlapping prefixes produce several combinations
  ['enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'], 4],
  ['hello', ['he', 'll', 'o', 'hello'], 2],
  // Words can be reused — many combinations possible
  ['aaaaaa', ['a', 'aa', 'aaa'], 24],
  // Target cannot be constructed — 0 ways
  ['skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'], 0],
  ['hello', ['world'], 0],
  // Empty word bank — nothing to construct from
  ['hello', [], 0],
  // Large target that cannot be constructed — exercises memoization
  ['eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'], 0],
])('countConstruct(%j, %j) === %i', (target, wordBank, expected) => {
  expect(countConstruct(target, wordBank)).toBe(expected);
});
