import { nodeTypes } from "../components/AddNetwork/AddNetwork";

export function filterEdges(edges, nodeIDType, nodes) {
    return edges.filter((edge) => {
        const from = edge[0];
        const to = edge[1];

        switch (nodeIDType) {
            case nodeTypes.Integer:
                const parsedFrom = parseInt(from, 10);
                const parsedTo = parseInt(to, 10);
                return nodes.has(parsedFrom) && nodes.has(parsedTo);
            case nodeTypes.String:
                return nodes.has(from) && nodes.has(to);
            default:
                throw new Error("Invalid node type specified.");
        }
    }).map((edge) => {
        if (nodeIDType === nodeTypes.Integer) return [parseInt(edge[0], 10), parseInt(edge[1], 10)];
        else return [edge[0], edge[1]];
    });
}