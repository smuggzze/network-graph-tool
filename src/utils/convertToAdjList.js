
export function convertToAdjList(graph) {
    const adjList = new Map();

    for (let node of graph.nodes) {
        adjList.set(node.id, []);
    }

    for (let link of graph.links) {
        const source = link.source.id;
        const target = link.target.id;

        adjList.get(source).push(target);
        if (!graph.isDirected) {
            adjList.get(target).push(source);
        }
    }

    return adjList;
}