
export class nodeStatisticAlgorithms {
    static clusteringCoefficient(node, graph) {
        const neighbours = new Set(graph.get(node));
        const degree = graph.get(node).length;
        
        // When degree is less than 2, a local clustering coefficient cannot be computed (divide by zero).
        if (degree <= 1) {
            return 0;
        }

        // The number of edges between neighbours of 'node'.
        let links = 0;
        for (let n1 of neighbours) {
            for (let n2 of graph.get(n1)) {
                if (neighbours.has(n2)) {
                    links++;
                }
            }
        }
        
        // Local clustering coefficient of 'node'.
        const clusteringCo = links / (degree * (degree - 1));
        return Math.round((clusteringCo + Number.EPSILON) * 1000) / 1000;
    }

    static inDegree(node, graph, isDirected) {
        if (!isDirected) {
            return graph.get(node).length;
        }
        
        const incidentNodes = new Set();
        for (let curNode of graph.keys()) {
            const neighbours = graph.get(curNode);
            if (neighbours.includes(node)) {
                incidentNodes.add(curNode);
            }
        }

        return incidentNodes.size;
    }
}