interface TrieNode {
  keys: Record<string, TrieNode>;
  isEnd: boolean;
}

/**
 * A trie, or a prefix tree, is a tree-like data structure used to store
 * and retrieve strings, allowing for quick search operations that involve
 * prefix matching.
 *
 * L = length of the word or prefix
 * N = number of words in the trie
 *
 * Time: O(L) for insertion, O(L) for exact match search, O(L + K) for prefix search, where L is
 * the length of the prefix, and K is length of matching words.
 * Space: O(N x L)
 */
export default class Trie {
  private _root: TrieNode;

  get root(): TrieNode {
    return Object.freeze(this._root);
  }

  constructor() {
    this._root = {
      keys: {},
      isEnd: false,
    };
  }

  /**
   * Inserts the specified word into the trie.
   *
   * @param word - Word to insert.
   */
  insert(word: string): void {
    let current = this._root;

    for (const char of word) {
      current.keys[char] ??= {
        keys: {},
        isEnd: false,
      };

      current = current.keys[char];
    }

    current.isEnd = true;
  }

  /**
   * Determines whether the specified word exists in the trie.
   *
   * @param word - Word to search for.
   * @returns Whether the word is found.
   */
  search(word: string): boolean {
    let current = this.root;

    for (const char of word) {
      if (current.keys[char] === undefined) {
        return false;
      }

      current = current.keys[char];
    }

    return current.isEnd;
  }

  /**
   * Determines whether words starting with the specified prefix exist in the trie.
   *
   * @param prefix - Prefix to search for.
   * @returns Whether words starting with the prefix are found.
   */
  startsWith(prefix: string): boolean {
    let current = this.root;

    for (const char of prefix) {
      if (current.keys[char] === undefined) {
        return false;
      }

      current = current.keys[char];
    }

    return true;
  }

  /**
   * Returns an array of words starting with the specified prefix.
   *
   * @param prefix - Prefix to search for.
   * @returns Array of words.
   */
  getWordsStartingWith(prefix: string): string[] {
    let current = this.root;

    for (const char of prefix) {
      if (current.keys[char] === undefined) {
        return [];
      }

      current = current.keys[char];
    }

    return this.getWordsRecursive(current, prefix);
  }

  /**
   * Returns an array of all words that have been inserted into the trie.
   *
   * @returns Array of words.
   */
  getWords(): string[] {
    const words: string[] = [];
    const stack: [TrieNode, string][] = [[this.root, '']];

    while (stack.length) {
      const [node, prefix] = stack.pop()!;
      const chars = Object.keys(node.keys);

      for (const char of chars) {
        const newPrefix = prefix + char;

        if (node.keys[char].isEnd) {
          words.push(newPrefix);
        }

        stack.push([node.keys[char], newPrefix]);
      }
    }

    return words;
  }

  /**
   * Recursively returns an array of all words that have been inserted into the trie.
   *
   * @param node - Current trie node. Defaults to root.
   * @param prefix - Current prefix string.
   * @returns Array of words.
   */
  getWordsRecursive(node = this.root, prefix = ''): string[] {
    const chars = Object.keys(node.keys);
    let currWords: string[] = [];

    if (node.isEnd) {
      currWords.push(prefix);
    }

    if (!chars.length) {
      return currWords;
    }

    for (const char of chars) {
      const newPrefix = prefix + char;
      const words = this.getWordsRecursive(node.keys[char], newPrefix);

      currWords = [...currWords, ...words];
    }

    return currWords;
  }

  /**
   * Removes the specified word from the trie.
   *
   * @param word - Word to remove.
   */
  remove(word: string): void {
    const stack: [TrieNode, string][] = [];
    let current = this.root;

    for (const char of word) {
      if (current.keys[char] === undefined) {
        return;
      }

      stack.push([current, char]);
      current = current.keys[char];
    }

    if (!current.isEnd) {
      return;
    }

    current.isEnd = false;

    while (stack.length) {
      const [node, char] = stack.pop()!;

      if (!Object.keys(node.keys[char].keys).length && !node.keys[char].isEnd) {
        delete node.keys[char];
      }
    }
  }
}
