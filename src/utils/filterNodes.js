import { nodeTypes } from "../utils/nodeTypes";

// Filters nodes given by the node list CSV file to ensure that only
// nodes of the correct data type are used in the graph.
export function filterNodes(nodeList, nodeIDType) {
    // Only return the unique node ID's, duplicates can be discarded.
    return [...new Set(nodeList.flat().filter((item) => {
        switch (nodeIDType) {
            case nodeTypes.Integer:
                // Check that the node ID is a valid Integer.
                return !isNaN(parseInt(item, 10)) && Number.isInteger(parseInt(item, 10));
            case nodeTypes.String:
                // Check that the node ID is not empty and is a string.
                return typeof item === "string" && item.length > 0;
            default:
                throw new Error("Invalid node type specified.");
        }
    }).map((item) => {
        // Convert the node type to an Integer if the user requested it.
        if (nodeIDType === nodeTypes.Integer) return parseInt(item, 10);
        else return item;
    }))];
}