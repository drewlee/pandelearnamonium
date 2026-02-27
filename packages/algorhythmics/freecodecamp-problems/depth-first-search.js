function dfs(graph, root) {
  const visited = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    visited.push(node);

    for (let i = 0; i < graph[node].length; i++) {
      if (graph[node][i] && !visited.includes(i)) {
        stack.push(i);
      }
    }
  }

  return visited;
}

const exDFSGraph = [
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [0, 0, 1, 0],
];
console.log(dfs(exDFSGraph, 3));
