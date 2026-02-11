import MinHeap from './min-heap.js';

type AdjacencyMap = Record<string, [string, number][]>;
type DijkstrasReturnMap = Record<string, number>;

function compareDistances(item1: [number, string], item2: [number, string]): boolean {
  return item1[0] < item2[0];
}

export default function dijkstras(graph: AdjacencyMap, start: string): DijkstrasReturnMap {
  const distances = Object.keys(graph).reduce<DijkstrasReturnMap>((map, vertex) => {
    map[vertex] = Infinity;
    return map;
  }, {});

  distances[start] = 0;

  const minHeap = new MinHeap<[number, string]>(compareDistances);
  minHeap.insert([0, start]);

  while (minHeap.length) {
    const [currentDistance, vertex] = minHeap.remove()!;
    const vertices = graph[vertex];

    for (const [neighbor, toDistance] of vertices) {
      const newDistance = currentDistance + toDistance;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        minHeap.insert([newDistance, neighbor]);
      }
    }
  }

  return distances;
}
