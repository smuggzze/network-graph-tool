import { graphColours } from "./graphColours";

export class NetworkComparisonAlgorithms {
    static outDegreeCentrality(graph) {
        return Object.fromEntries(new Map(Array.from(graph.keys()).map((node) => {
            const outDegree = graph.get(node).length;
            const bgColours = graphColours.Centrality;

            const colour = outDegree >= 6 ? bgColours["High importance"] : 
            outDegree >= 3 ? bgColours["Medium importance"] : 
            bgColours["Low importance"];

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

            const colour = inDegree >= 6 ? bgColours["High importance"] : 
            inDegree >= 3 ? bgColours["Medium importance"] : 
            bgColours["Low importance"];

            return [
                node,
                { ...colour }
            ];
        })));
    }

    static betweennessCentrality(graph) {

    }

    static closenessCentrality(graph) {

    }

    static eigenvectorCentrality(graph) {

    }

    static commonNodeIDs(graph) {

    }

    static jaccardSimilarity(graph) {

    }

    static stronglyConnectedComponents(graph) {

    }
}