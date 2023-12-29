import { constructUndirectedGraph } from "./constructUndirectedGraph";

export class NetworkStatisticAlgorithms {
    static avgClusteringCoefficient(graph) {

    }

    static avgPathLength(graph) {

    }

    static graphDensity(graph) {

    }

    static networkDiameter(graph) {

    }

    static connectedComponents(graph) {
        const udGraph = constructUndirectedGraph(graph);
        const visited = new Set();
        let components = 0;

        function bfs(node) {
            const queue = [node];
            visited.add(node);

            while (queue.length > 0) {
                const curNode = queue.shift();
                for (let neighbor of udGraph.get(curNode)) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }

        for (let node of udGraph.keys()) {
            if (!visited.has(node)) {
                components++;
                bfs(node);
            }
        }

        return components;
    }

    static avgDegree(graph) {
        
    }
}