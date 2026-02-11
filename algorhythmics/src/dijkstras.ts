import MinHeap from './min-heap.js';

type AdjacencyList = Record<string, [string, number][]>;
type DijkstraResult = Record<string, number>;
type MinHeapItem = [number, string];

/**
 * Custom comparison function used by the min-heap.
 *
 * @param item1 - First item to compare.
 * @param item2 - Second item to compare.
 * @returns Whether the first item is less than the second item.
 */
function compareDistances(item1: MinHeapItem, item2: MinHeapItem): boolean {
  return item1[0] < item2[0];
}

/**
 * Dijkstra’s algorithm is used to find the shortest distance between the starting vertex and the
 * other vertices in the graph. It runs in O((E + V) log V) time.
 *
 * @param graph - Graph of vertices and edges.
 * @param start - Vertex to start traversing from.
 * @returns Map of shortest distances and their paths.
 */
export default function dijkstras(graph: AdjacencyList, start: string): DijkstraResult {
  const distances = Object.keys(graph).reduce<DijkstraResult>((map, vertex) => {
    map[vertex] = Infinity;
    return map;
  }, {});

  const paths = Object.keys(graph).reduce<Record<string, string[]>>((map, vertex) => {
    map[vertex] = [];
    return map;
  }, {});

  distances[start] = 0;
  paths[start] = [start];

  const minHeap = new MinHeap<MinHeapItem>(compareDistances);
  minHeap.insert([0, start]);

  while (minHeap.length) {
    const [currentDistance, vertex] = minHeap.remove()!;
    const vertices = graph[vertex];

    for (const [neighbor, toDistance] of vertices) {
      const newDistance = currentDistance + toDistance;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        paths[neighbor] = [...paths[vertex], neighbor];
        minHeap.insert([newDistance, neighbor]);
      }
    }
  }

  console.log('Logging vertices paths:', paths);

  return distances;
}
