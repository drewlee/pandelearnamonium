interface TrieNode {
  [key: string]: TrieNode | true;
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
  private _endSymbol = '*';
  private _root: TrieNode = {};

  get endSymbol(): string {
    return this._endSymbol;
  }

  get root(): TrieNode {
    return Object.freeze(this._root);
  }

  /**
   * Inserts the specified word into the trie.
   *
   * @param word - Word to insert.
   */
  insert(word: string): void {
    let current = this._root;

    for (const char of word) {
      if (current[char] === undefined) {
        current[char] = {};
      }

      current = current[char] as TrieNode;
    }

    current[this.endSymbol] = true;
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
      if (current[char] === undefined) {
        return false;
      }

      current = current[char] as TrieNode;
    }

    return current[this.endSymbol] !== undefined;
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
      if (current[char] === undefined) {
        return false;
      }

      current = current[char] as TrieNode;
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
    const words: string[] = [];
    let current = this.root;

    for (const char of prefix) {
      if (current[char] === undefined) {
        return words;
      }

      current = current[char] as TrieNode;
    }

    const stack: [TrieNode, string][] = [[current, prefix]];

    while (stack.length) {
      const [node, currPrefix] = stack.pop()!;
      const chars = Object.keys(node);

      for (const char of chars) {
        if (char === this.endSymbol) {
          words.push(currPrefix);
        }

        stack.push([node[char] as TrieNode, currPrefix + char]);
      }
    }

    return words;
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
      const chars = Object.keys(node);

      for (const char of chars) {
        if (char === this.endSymbol) {
          words.push(prefix);
        }

        stack.push([node[char] as TrieNode, prefix + char]);
      }
    }

    return words;
  }
}
