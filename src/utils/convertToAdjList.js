
export function convertToAdjList(graph) {
    const adjList = new Map();
    const visited = new Map();

    for (let node of graph.nodes) {
        adjList.set(node.id, []);
        visited.set(node.id, new Set());
    }

    for (let link of graph.links) {
        const source = link.source.id;
        const target = link.target.id;
        
        if (!graph.isDirected) {
            if (visited.get(target).has(source)) {
                continue;
            }

            adjList.get(target).push(source);
            visited.get(target).add(source);
        }

        adjList.get(source).push(target);
        visited.get(source).add(target);
    }

    return adjList;
}