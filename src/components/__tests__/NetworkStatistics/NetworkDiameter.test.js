import { NetworkStatisticAlgorithms } from "../../../utils/networkStatisticAlgorithms";

test('Fully connected Undirected Graph', () => {
    const graph = new Map([
        [1, [2, 4, 3]],
        [2, [1, 3, 4]],
        [3, [1, 2, 4]],
        [4, [3, 1, 2]]
    ]);

    expect(NetworkStatisticAlgorithms.networkDiameter(graph)).toBe(1);
});

test('Empty Graph', () => {
    const graph = new Map();
    expect(NetworkStatisticAlgorithms.networkDiameter(graph)).toBe(0);
});

test('Directed Acyclic Graph with a depth of 3', () => {
    const graph = new Map([
        [1, [4, 2]],
        [4, [5]],
        [5, [6]],
        [2, [3]],
        [3, []],
        [6, []]
    ]);

    expect(NetworkStatisticAlgorithms.networkDiameter(graph)).toBe(3);
});

test('Directed Graph that has a node with N - 1 incoming edges', () => {
    const graph = new Map([
        [4, [1]],
        [2, [1]],
        [5, [1]],
        [3, [1]],
        [1, []]
    ]);

    expect(NetworkStatisticAlgorithms.networkDiameter(graph)).toBe(1);
});

test('Doubly linked list structure graph', () => {
    const graph = new Map([
        [1, [2]],
        [2, [1, 3]],
        [3, [2, 4]],
        [4, [3, 5]],
        [5, [4]]
    ]);

    expect(NetworkStatisticAlgorithms.networkDiameter(graph)).toBe(4);
});