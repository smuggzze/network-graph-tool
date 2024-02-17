import { NetworkStatisticAlgorithms } from "../../../utils/networkStatisticAlgorithms";

test('Graph 3 nodes 3 connections', () => {
    const graph = new Map([
        [1, [2]],
        [2, [3]],
        [3, [1]]
    ]);

    expect(NetworkStatisticAlgorithms.avgDegree(graph)).toBe(1);
});
test('Graph 3 nodes 0 connections', () => {
    const graph = new Map([
        [1, []],
        [2, []],
        [3, []]
    ]);

    expect(NetworkStatisticAlgorithms.avgDegree(graph)).toBe(0);
});

test('Graph 8 nodes 23 connections', () => {
    const graph = new Map([
        [1, [3,2,5]],
        [2, [3,2,5,7,5]],
        [3, [1,6,7,8]],
        [4, [4,5,3,7,8]],
        [5, [2,4]],
        [6, []],
        [7, [2,5]],
        [8, [4,7]]


    ]);

    expect(NetworkStatisticAlgorithms.avgDegree(graph)).toBe(2.875);
});

test('Graph 6 nodes 9 connections', () => {
    const graph = new Map([
        [1, [2,5]],
        [2, [1,6]],
        [3, [1]],
        [4, [6]],
        [5, [2,4]],
        [6, [1]]
  
    ]);

    expect(NetworkStatisticAlgorithms.avgDegree(graph)).toBe(1.5);
});
test('Graph 6 nodes 30 connections', () => {
    const graph = new Map([
        [1, [2,3,4,5,6]],
        [2, [1,3,4,5,6]],
        [3, [1,2,4,5,6]],
        [4, [1,2,3,5,6]],
        [5, [1,2,3,4,6]],
        [6, [1,2,3,4,5]]
  
    ]);

    expect(NetworkStatisticAlgorithms.avgDegree(graph)).toBe(5);
});

