import canConstruct from '../../src/dynamic-programming/fcc-can-construct-td.ts';

test.each([
  // Empty target is always constructible
  ['', ['cat', 'dog', 'mouse'], true],
  // Target constructible from a single word
  ['hello', ['he', 'll', 'o', 'hello'], true],
  // Target constructible from multiple words
  ['abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'], true],
  ['enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'], true],
  ['purple', ['purp', 'p', 'ur', 'le', 'purpl'], true],
  // Words can be reused
  ['aaaaaa', ['a', 'aa', 'aaa'], true],
  // Target not constructible — no combination of words covers it
  ['skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'], false],
  ['abcdef', ['ab', 'cd'], false],
  ['hello', ['world'], false],
  // Empty word bank — nothing to construct from
  ['hello', [], false],
  // Large target that cannot be constructed — exercises memoization
  ['eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'], false],
])('canConstruct(%j, %j) === %s', (target, wordBank, expected) => {
  expect(canConstruct(target, wordBank)).toBe(expected);
});
