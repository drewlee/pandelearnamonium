import dijkstras from '../src/dijkstras.ts';

test('Returns a map of shortest distances 1', () => {
  const graph: Record<string, [string, number][]> = {
    A: [
      ['B', 10],
      ['C', 3],
    ],
    C: [['D', 2]],
    D: [['E', 10]],
    E: [['A', 7]],
    B: [
      ['C', 3],
      ['D', 2],
    ],
  };

  const result = dijkstras(graph, 'D');
  expect(result).toStrictEqual({
    A: 17,
    C: 20,
    D: 0,
    E: 10,
    B: 27,
  });
});

test('Returns a map of shortest distances 2', () => {
  const graph: Record<string, [string, number][]> = {
    A: [
      ['B', 3],
      ['C', 1],
    ],
    B: [
      ['A', 3],
      ['C', 4],
      ['E', 1],
    ],
    C: [
      ['B', 4],
      ['D', 7],
      ['A', 1],
    ],
    D: [
      ['C', 7],
      ['E', 5],
      ['G', 1],
    ],
    E: [
      ['B', 1],
      ['D', 5],
      ['F', 2],
    ],
    F: [
      ['G', 1],
      ['E', 2],
      ['C', 18],
    ],
    G: [
      ['D', 1],
      ['F', 1],
    ],
  };

  const result = dijkstras(graph, 'A');
  console.log(result);
  expect(result).toBeTruthy();
});
