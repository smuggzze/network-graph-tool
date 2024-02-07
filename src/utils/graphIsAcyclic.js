import { convertToAdjList } from "./convertToAdjList";

export function graphIsAcyclic(graph) {
    const adjList = convertToAdjList(graph);
    const visited = new Set();

    function findCycle(node, curVis) {
        if (curVis.has(node)) return true;
        if (visited.has(node)) return false;

        visited.add(node);
        curVis.add(node);

        for (let nextNode of adjList.get(node)) {
            const foundCycle = findCycle(nextNode, curVis);
            if (foundCycle) {
                return true;
            }
        }

        curVis.delete(node);
        return false;
    }

    const foundCycle = findCycle(adjList.keys().next().value, new Set());
    return !foundCycle && visited.size === adjList.size;
}