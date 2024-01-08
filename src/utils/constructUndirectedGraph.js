
// Constructs an undirected graph from a directed graph
// by converting a single directional edge from node U to node V
// into a bidirectional edge U <--> V.
export function constructUndirectedGraph(directedGraph) {
    const udGraph = new Map();

    for (let node of directedGraph.keys()) {
        udGraph.set(node, []);
    }

    for (let node of directedGraph.keys()) {
        for (let neighbor of directedGraph.get(node)) {
            udGraph.get(node).push(neighbor);
            udGraph.get(neighbor).push(node);
        }
    }

    return udGraph;
}