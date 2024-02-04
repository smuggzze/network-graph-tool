import { constructUndirectedGraph } from "./constructUndirectedGraph";
import { nodeStatisticAlgorithms } from "./nodeStatisticAlgorithms";

export class NetworkStatisticAlgorithms {
    // Calculates the average clustering coefficient of the graph
    // using the local clustering coefficient method.
    static avgClusteringCoefficient(graph) {
        let clusteringSum = 0;

        for (let node of graph.keys()) {
            const clusteringCo = nodeStatisticAlgorithms.clusteringCoefficient(node, graph);
            clusteringSum += clusteringCo;
        }
        
        // Calculates the average clustering coefficient by dividing by the number of nodes.
        const avgClusteringCo = clusteringSum / graph.size;
        return Math.round((avgClusteringCo + Number.EPSILON) * 1000) / 1000;
    }

    static avgPathLength(graph) {
        let componentCount = 0;
        let sumLengths = 0;
        const visited = new Set();

        function getAvgLength(nodes) {
            let numPaths = 0;
            let sumPaths = 0;

            for (let node of nodes) {
                const queue = [[node, 0]];
                const curVisited = new Set();
                curVisited.add(node);

                while (queue.length > 0) {
                    const [curNode, dist] = queue.shift();

                    for (let neighbour of graph.get(curNode)) {
                        if (!curVisited.has(neighbour)) {
                            // Mark node as visited and add to queue so it can be processed next.
                            curVisited.add(neighbour);
                            queue.push([neighbour, dist + 1]);
                            sumPaths += dist + 1;
                            numPaths++;
                        }
                    }
                }
            }

            return numPaths === 0 ? 0 : sumPaths / numPaths;
        }

        for (let node of graph.keys()) {
            if (!visited.has(node)) {
                const nodes = NetworkStatisticAlgorithms.visitComponent(node, visited, graph);
                sumLengths += getAvgLength(nodes);
                componentCount++;
            }
        }

        const avg = sumLengths / componentCount;
        return Math.round((avg + Number.EPSILON) * 1000) / 1000;
    }

    // Determines the density of the graph by calculating
    // the ratio of the number of edges to the number of
    // possible edges that could exist within the graph.
    static graphDensity(graph) {
        const numNodes = graph.size;
        let numEdges = 0;

        for (let node of graph.keys()) {
            const degree = graph.get(node).length;
            numEdges += degree;
        }

        // Formula that works for both directed and undirected graphs.
        const density = numEdges / (numNodes * (numNodes - 1));
        return Math.round((density + Number.EPSILON) * 1000) / 1000;
    }

    // Calculates the longest shortest path between all pairs
    // of nodes in the graph. This determines the 'diameter' of the
    // graph.
    static networkDiameter(graph) {
        let diameter = 0;

        function findBestDiameter(node) {
            const queue = [[node, 0]];
            let bestDiameter = 0;

            const visited = new Set();
            visited.add(node);

            while (queue.length > 0) {
                const [curNode, dist] = queue.shift();
                bestDiameter = Math.max(bestDiameter, dist);

                for (let neighbour of graph.get(curNode)) {
                    if (!visited.has(neighbour)) {
                        // Mark node as visited and add to queue so it can be processed next.
                        visited.add(neighbour);
                        queue.push([neighbour, dist + 1]);
                    }
                }
            }

            return bestDiameter;
        }

        for (let node of graph.keys()) {
            const bestDiameter = findBestDiameter(node);
            diameter = Math.max(diameter, bestDiameter);
        }

        return diameter;
    }

    // Visits the component of the graph by marking each node as visited.
    static visitComponent(node, visited, graph) {
        const queue = [node];
        const nodes = [node];
        visited.add(node);

        while (queue.length > 0) {
            const curNode = queue.shift();
            for (let neighbour of graph.get(curNode)) {
                if (!visited.has(neighbour)) {
                    // Mark node as visited and add to queue so it can be processed next.
                    visited.add(neighbour);
                    queue.push(neighbour);
                    nodes.push(neighbour);
                }
            }
        }

        return nodes;
    }

    // Computes the number of connected components within the graph
    // using a Breadth-First search.
    static connectedComponents(graph, isDirected) {
        // To keep the algorithm the same for both graph types, convert to undirected graph.
        if (isDirected) {
            graph = constructUndirectedGraph(graph);
        }
        
        // Stores the nodes that have been visited during the graph traversal.
        const visited = new Set();
        // Number of connected components within the graph.
        let components = 0;

        for (let node of graph.keys()) {
            // If this is a new component, explore it.
            if (!visited.has(node)) {
                NetworkStatisticAlgorithms.visitComponent(node, visited, graph);
                components++;
            }
        }

        return components;
    }

    // Computes the average degree of all nodes within the graph.
    static avgDegree(graph) {
        let degreeSum = 0;

        for (let node of graph.keys()) {
            degreeSum += graph.get(node).length;
        }
        
        const avgDegree = degreeSum / graph.size;
        return Math.round((avgDegree + Number.EPSILON) * 1000) / 1000;
    }
}