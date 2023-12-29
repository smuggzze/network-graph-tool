
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