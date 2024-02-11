import { graphColours } from "./graphColours";

export class NetworkComparisonAlgorithms {
    static outDegreeCentrality(graph) {
        return Object.fromEntries(new Map(Array.from(graph.keys()).map((node) => {
            const outDegree = graph.get(node).length;
            const bgColours = graphColours.Centrality;

            const colour = outDegree >= 10 ? bgColours["Very high"] : 
            outDegree >= 8 ? bgColours["High"] : outDegree >= 6 ?
            bgColours["Medium"] : bgColours["Low"];

            return [
                node,
                { ...colour }
            ];
        })));
    }

    static inDegreeCentrality(graph) {
        const nodes = new Map(Array.from(graph.keys()).map((node) => [node, 0]));

        for (let node of graph.keys()) {
            for (let neighbour of graph.get(node)) {
                const count = nodes.get(neighbour);
                nodes.set(neighbour, count + 1);
            }
        }

        return Object.fromEntries(new Map(Array.from(graph.keys()).map((node) => {
            const inDegree = nodes.get(node);
            const bgColours = graphColours.Centrality;

            const colour = inDegree >= 10 ? bgColours["Very high"] : 
            inDegree >= 8 ? bgColours["High"] : inDegree >= 6 ?
            bgColours["Medium"] : bgColours["Low"];

            return [
                node,
                { ...colour }
            ];
        })));
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