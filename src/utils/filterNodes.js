import { nodeTypes } from "../components/AddNetwork/AddNetwork";

export function filterNodes(nodeList, nodeIDType) {
    return [...new Set(nodeList.flat().filter((item) => {
        switch (nodeIDType) {
            case nodeTypes.Integer:
                const parsedInt = parseInt(item, 10);
                return !isNaN(parsedInt) && Number.isInteger(parsedInt);
            case nodeTypes.String:
                return typeof item === "string" && item.length > 0;
            default:
                throw new Error("Invalid node type specified.");
        }
    }).map((item) => {
        if (nodeIDType === nodeTypes.Integer) return parseInt(item, 10);
        else return item;
    }))];
}