import { getCentralityRanks } from "./getCentralityRanks";

export class NetworkComparisonAlgorithms {
    static outDegreeCentrality(graph) {
        const outDegrees = Array.from(graph.keys())
        .map((node) => [node, graph.get(node).length]);
        
        return getCentralityRanks(outDegrees);
    }

    static inDegreeCentrality(graph) {
        const nodes = new Map(Array.from(graph.keys()).map((node) => [node, 0]));

        for (let node of graph.keys()) {
            for (let neighbour of graph.get(node)) {
                const count = nodes.get(neighbour);
                nodes.set(neighbour, count + 1);
            }
        }

        const inDegrees = Array.from(graph.keys())
        .map((node) => [node, nodes.get(node)]);

        return getCentralityRanks(inDegrees);
    }

    static betweennessCentrality(graph) {

    }

    static inboundClosenessCentrality(graph) {

    }

    static outboundClosenessCentrality(graph) {

    }

    static eigenvectorCentrality(graph) {

    }

    static commonNodeIDs(graph) {
        // jacob
    }

    static jaccardSimilarity(graph) {
        // paige
    }

    static stronglyConnectedComponents(graph) {

    }
}