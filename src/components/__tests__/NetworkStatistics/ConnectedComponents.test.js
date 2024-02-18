import { NetworkStatisticAlgorithms } from "../../../utils/networkStatisticAlgorithms";

test('Directed Graph with 1 connected component', () => {
    const graph = new Map([
        [1, [2]],
        [2, [3]],
        [3, [1]]
    ]);

    expect(NetworkStatisticAlgorithms.connectedComponents(graph, true)).toBe(1);
});

test('Directed Graph with 3 connected components', () => {
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
    
    expect(NetworkStatisticAlgorithms.connectedComponents(graph, true)).toBe(3);
});

test('Empty Undirected Graph with 0 connected components', () => {
    const graph = new Map([]);
    expect(NetworkStatisticAlgorithms.connectedComponents(graph, false)).toBe(0);
});

test('Empty Directed Graph with 0 connected components', () => {
    const graph = new Map([]);
    expect(NetworkStatisticAlgorithms.connectedComponents(graph, true)).toBe(0);
});

test('Directed Acyclic Graph with 2 components', () => {
    const graph = new Map([
        [1, [2, 3]],
        [2, [4]],
        [3, [2]],
        [5, [6]],
        [6, [7]],
        [4, []],
        [7, []]
    ]);
    
    expect(NetworkStatisticAlgorithms.connectedComponents(graph, true)).toBe(2);
});

test('Undirected graph with 4 components', () => {
    const graph = new Map([
        [1, [2]],
        [2, [1]],
        [3, [4]],
        [4, [3]],
        [5, [6]],
        [6, [5]],
        [7, [8]],
        [8, [7]]
    ]);
    
    expect(NetworkStatisticAlgorithms.connectedComponents(graph, false)).toBe(4);
});