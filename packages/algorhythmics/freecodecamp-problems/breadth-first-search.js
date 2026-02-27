function bfs(graph, root) {
  const nodesLen = {};
  const queue = [[root, 0]];

  while (queue.length) {
    const [node, depth] = queue.pop();
    nodesLen[node] = depth;

    for (let i = 0; i < graph[node].length; i++) {
      if (graph[node][i] && nodesLen[i] === undefined) {
        queue.unshift([i, depth + 1]);
      }
    }
  }

  for (let i = 0; i < graph.length; i++) {
    if (nodesLen[i] === undefined) {
      nodesLen[i] = Infinity;
    }
  }

  return nodesLen;
}

const exBFSGraph = [
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [0, 0, 1, 0],
];
console.log(bfs(exBFSGraph, 3));
