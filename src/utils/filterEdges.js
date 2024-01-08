import { nodeTypes } from "../utils/nodeTypes";

// Filters edges given by the edge list CSV file to ensure that
// no invalid edges are considered when constructing the graph.
export function filterEdges(edges, nodeIDType, nodes) {
    return edges.filter((edge) => {
        const from = edge[0];
        const to = edge[1];

        switch (nodeIDType) {
            case nodeTypes.Integer:
                // Checks that the source node and target node exist within the 'nodes' set.
                return nodes.has(parseInt(from, 10)) && nodes.has(parseInt(to, 10));
            case nodeTypes.String:
                return nodes.has(from) && nodes.has(to);
            default:
                throw new Error("Invalid node type specified.");
        }
    }).map((edge) => {
        // Convert the source and target node type to an Integer if the user requested it.
        if (nodeIDType === nodeTypes.Integer) return [parseInt(edge[0], 10), parseInt(edge[1], 10)];
        else return [edge[0], edge[1]];
    });
}