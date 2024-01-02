import { NetworkStatisticAlgorithms } from "../../../utils/networkStatisticAlgorithms";

test('1 connected component', () => {
    const graph = new Map([
        [1, [2]],
        [2, [3]],
        [3, [1]]
    ]);

    expect(NetworkStatisticAlgorithms.connectedComponents(graph)).toBe(1);
});

test('3 connected components', () => {
    const graph = new Map([
        [1, [2]],
        [2, [3]],
        [3, [1, 2]],
        [4, [7, 5]],
        [5, [7]],
        [6, [9]],
        [7, [4, 5]],
        [8, [6, 9]],
        [9, [6]],
    ]);

    expect(NetworkStatisticAlgorithms.connectedComponents(graph)).toBe(3);
});

test('0 connected components', () => {
    const graph = new Map([]);
    expect(NetworkStatisticAlgorithms.connectedComponents(graph)).toBe(0);
});