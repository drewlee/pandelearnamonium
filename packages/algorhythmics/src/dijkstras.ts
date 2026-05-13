import HeapItem from './heap-item.js';
import MinHeap from './min-heap.js';

type AdjacencyList = Record<string, [string, number][]>;
type DijkstraResult = Record<string, number>;

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

  const minHeap = new MinHeap<string>();
  minHeap.insert(new HeapItem(start, 0));

  while (minHeap.length) {
    const item = minHeap.remove()!;
    const vertex = item.value;
    const currentDistance = item.priority as number;
    const vertices = graph[vertex];

    for (const [neighbor, toDistance] of vertices) {
      const newDistance = currentDistance + toDistance;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        paths[neighbor] = [...paths[vertex], neighbor];
        minHeap.insert(new HeapItem(neighbor, newDistance));
      }
    }
  }

  console.log('Logging vertices paths:', paths);

  return distances;
}
