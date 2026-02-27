import dijkstras from '../src/dijkstras.ts';

test('Returns a map of shortest distances and logs their paths 1', () => {
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

  const spy = vi.spyOn(console, 'log');
  const result = dijkstras(graph, 'D');

  expect(spy.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "Logging vertices paths:",
        {
          "A": [
            "D",
            "E",
            "A",
          ],
          "B": [
            "D",
            "E",
            "A",
            "B",
          ],
          "C": [
            "D",
            "E",
            "A",
            "C",
          ],
          "D": [
            "D",
          ],
          "E": [
            "D",
            "E",
          ],
        },
      ],
    ]
  `);
  expect(result).toStrictEqual({ A: 17, C: 20, D: 0, E: 10, B: 27 });

  spy.mockRestore();
});

test('Returns a map of shortest distances and logs their paths 2', () => {
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

  const spy = vi.spyOn(console, 'log');
  const result = dijkstras(graph, 'A');

  expect(spy.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "Logging vertices paths:",
        {
          "A": [
            "A",
          ],
          "B": [
            "A",
            "B",
          ],
          "C": [
            "A",
            "C",
          ],
          "D": [
            "A",
            "C",
            "D",
          ],
          "E": [
            "A",
            "B",
            "E",
          ],
          "F": [
            "A",
            "B",
            "E",
            "F",
          ],
          "G": [
            "A",
            "B",
            "E",
            "F",
            "G",
          ],
        },
      ],
    ]
  `);
  expect(result).toStrictEqual({ A: 0, B: 3, C: 1, D: 8, E: 4, F: 6, G: 7 });

  spy.mockRestore();
});
