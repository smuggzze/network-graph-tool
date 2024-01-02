import { constructUndirectedGraph } from "./constructUndirectedGraph";

export class NetworkStatisticAlgorithms {
    static avgClusteringCoefficient(graph, isDirected) {

    }

    static avgPathLength(graph, isDirected) {

    }

    static graphDensity(graph) {
        let numEdges = 0;

        for (let key of graph.keys()) { //looping through each node
            let degree = graph.get(key);
            numEdges = numEdges + degree.length // adding the edges connected to each node
        }

        const density = numEdges / (numEdges * (numEdges - 1))
        return Math.round(density * 100) / 100;
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
                for (let neighbor of graph.get(curNode)) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
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
        return Math.round((avgDegree + Number.EPSILON) * 100) / 100;
    }
}