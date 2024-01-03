import { constructUndirectedGraph } from "./constructUndirectedGraph";

export class NetworkStatisticAlgorithms {
    static avgClusteringCoefficient(graph) {
        let clusteringSum = 0;

        for (let node of graph.keys()) {
            const neighbours = new Set(graph.get(node));
            const deg = graph.get(node).length;
            
            if (deg <= 1) {
                continue;
            }

            let links = 0;
            for (let n1 of neighbours) {
                for (let n2 of graph.get(n1)) {
                    if (neighbours.has(n2)) {
                        links++;
                    }
                }
            }
            
            const clusteringCo = links / (deg * (deg - 1));
            clusteringSum += clusteringCo;
        }

        const avgClusteringCo = clusteringSum / graph.size;
        return Math.round((avgClusteringCo + Number.EPSILON) * 1000) / 1000;
    }

    static avgPathLength(graph, isDirected) {
        
    }

    static graphDensity(graph) {
        const numNodes = graph.size;
        let numEdges = 0;

        for (let node of graph.keys()) { //looping through each node
            const degree = graph.get(node);
            numEdges = numEdges + degree.length // adding the edges connected to each node
        }

        const density = numEdges / (numNodes * (numNodes - 1));
        return Math.round((density + Number.EPSILON) * 1000) / 1000;
    }

    static networkDiameter(graph, isDirected) {

    }

    static connectedComponents(graph, isDirected) {
        if (isDirected) {
            graph = constructUndirectedGraph(graph);
        }

        const visited = new Set();
        let components = 0;

        function bfs(node) {
            const queue = [node];
            visited.add(node);

            while (queue.length > 0) {
                const curNode = queue.shift();
                for (let neighbour of graph.get(curNode)) {
                    if (!visited.has(neighbour)) {
                        visited.add(neighbour);
                        queue.push(neighbour);
                    }
                }
            }
        }

        for (let node of graph.keys()) {
            if (!visited.has(node)) {
                components++;
                bfs(node);
            }
        }

        return components;
    }

    static avgDegree(graph) {
        let degreeSum = 0;

        for (let node of graph.keys()) {
            degreeSum += graph.get(node).length;
        }
        
        const avgDegree = degreeSum / graph.size;
        return Math.round((avgDegree + Number.EPSILON) * 1000) / 1000;
    }
}