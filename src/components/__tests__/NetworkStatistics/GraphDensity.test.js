import { NetworkStatisticAlgorithms } from "../../../utils/networkStatisticAlgorithms";

test('Directed Graph 3 nodes 3 connections half', () => {
    const graph = new Map([
        [1, [2]],
        [2, [3]],
        [3, [1]]
    ]);

    expect(NetworkStatisticAlgorithms.graphDensity(graph)).toBe(0.5);
});

test('Undirected Graph 3 nodes 6 connections max', () => {
    const graph = new Map([
        [1, [2,3]],
        [2, [3,1]],
        [3, [1,2]]
    ]);

    expect(NetworkStatisticAlgorithms.graphDensity(graph)).toBe(1);
});

test('Graph 3 nodes 0 connections min', () => {
    const graph = new Map([
        [1, []],
        [2, []],
        [3, []]
    ]);

    expect(NetworkStatisticAlgorithms.graphDensity(graph)).toBe(0);
});

test('Graph 7 nodes 14 connections', () => {
    const graph = new Map([
        [1, [2,5]],
        [2, [3,6]],
        [3, [4,1]],
        [4, [5,7]],
        [5, [6,3]],
        [6, [7,2]],
        [7, [1,4]]

    ]);

    expect(NetworkStatisticAlgorithms.graphDensity(graph)).toBe(0.333);
});

test('Graph 13 nodes 37 connections min', () => {
    const graph = new Map([
        [1, [2,7,12]],
        [2, [3,1,4,6]],
        [3, [4,10]],
        [4, [5,8]],
        [5, [6]],
        [6, [7,2,13]],
        [7, [8,4,6]],
        [8, [9,10]],
        [9, [10,7,1,4]],
        [10, [11,9,1]],
        [11, [12,3,5]],
        [12, [13,10,2,6,3]],
        [13, [1,4,6,10,11]],

    ]);

    expect(NetworkStatisticAlgorithms.graphDensity(graph)).toBe(0.256);
});

