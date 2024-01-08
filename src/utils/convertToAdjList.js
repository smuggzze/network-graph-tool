
// Converts the graph structure used by the 'React-Force-Graph' library
// into an adjacency list to allow for searching algorithm such as Depth-First search
// and Breadth-First search to be performed.
export function convertToAdjList(graph) {
    // New adjacency list structure.
    const adjList = new Map();
    // Keeps track of the edges that have already been created.
    const visited = new Map();

    for (let node of graph.nodes) {
        adjList.set(node.id, []);
        visited.set(node.id, new Set());
    }

    for (let link of graph.links) {
        const source = link.source.id;
        const target = link.target.id;
        
        // If the graph is undirected, check that the bidirectional edge doesn't already exist within 'visited'.
        if (!graph.isDirected) {
            if (visited.get(target).has(source)) {
                continue;
            }

            // Create edge from target to source node in adjacency list and add to visited map.
            adjList.get(target).push(source);
            visited.get(target).add(source);
        }

        // Create edge from source to target node in adjacency list and add to visited map.
        adjList.get(source).push(target);
        visited.get(source).add(target);
    }

    return adjList;
}