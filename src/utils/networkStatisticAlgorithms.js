import { constructUndirectedGraph } from "./constructUndirectedGraph";

export class NetworkStatisticAlgorithms {
    // Calculates the average clustering coefficient of the graph
    // using the local clustering coefficient method.
    static avgClusteringCoefficient(graph) {
        let clusteringSum = 0;

        for (let node of graph.keys()) {
            const neighbours = new Set(graph.get(node));
            const degree = graph.get(node).length;
            
            // When degree is less than 2, a local clustering coefficient cannot be computed (divide by zero).
            if (degree <= 1) {
                continue;
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
            clusteringSum += clusteringCo;
        }
        
        // Calculates the average clustering coefficient by dividing by the number of nodes.
        const avgClusteringCo = clusteringSum / graph.size;
        return Math.round((avgClusteringCo + Number.EPSILON) * 1000) / 1000;
    }

    static avgPathLength(graph, isDirected) {
        
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

    static networkDiameter(graph, isDirected) {

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

        // Visits all nodes within a graph component to ensure that they are not visited again.
        function bfs(node) {
            const queue = [node];
            visited.add(node);

            while (queue.length > 0) {
                const curNode = queue.shift();
                for (let neighbour of graph.get(curNode)) {
                    if (!visited.has(neighbour)) {
                        // Mark node as visited and add to queue so it can be processed next.
                        visited.add(neighbour);
                        queue.push(neighbour);
                    }
                }
            }
        }

        for (let node of graph.keys()) {
            // If this is a new component, explore it.
            if (!visited.has(node)) {
                components++;
                bfs(node);
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