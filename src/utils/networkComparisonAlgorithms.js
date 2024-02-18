import { convertToAdjList } from "./convertToAdjList";
import { getCentralityRanks } from "./getCentralityRanks";

export class NetworkComparisonAlgorithms {
    static outDegreeCentrality(graph) {
        const outDegrees = Array.from(graph.keys())
        .map((node) => [node, graph.get(node).length]);
        
        return getCentralityRanks(outDegrees);
    }

    static inDegreeCentrality(graph) {

        // in-degree centrality = number of edges that point to the node
        const nodes = new Map(Array.from(graph.keys()).map((node) => [node, 0])); // create a map of nodes with a value of 0

        for (let node of graph.keys()) { // for each node in the graph
            for (let neighbour of graph.get(node)) { // for each neighbour of the node
                const count = nodes.get(neighbour); // get the current count of the neighbour
                nodes.set(neighbour, count + 1); // increment the count of the neighbour
            }
        }

        const inDegrees = Array.from(graph.keys())
        .map((node) => [node, nodes.get(node)]);

        return getCentralityRanks(inDegrees);
    }

    static betweennessCentrality(graph) {

            const betweenness = new Map(); // create a map of nodes with their betweenness centrality
            const nodes = Array.from(graph.keys());
            console.log(nodes);
            
            
            nodes.forEach(node => betweenness.set(node, 0)); // initialize the betweenness centrality of each node to 0
            nodes.forEach(node => { // for each node in the graph
                const dependencies = new Map(); 
                const numShortestPaths = new Map();
                const distance = new Map();
                const predecessors = new Map();

                nodes.filter(n => n !== node).forEach(n => { // for each node in the graph that is not the current node
                    dependencies.set(n, []); // initialize the dependencies of the node to an empty array
                    numShortestPaths.set(n, 0); // initialize the number of shortest paths of the node to 0
                    distance.set(n, -1); // initialize the distance of the node to -1
                    predecessors.set(n, []); // initialize the predecessors of the node to an empty array
                });
                

                const queue = [node];
                const stack = [];
                distance.set(node, 0); // set the distance of the current node to 0
                numShortestPaths.set(node, 1); // set the number of shortest paths of the current node to 1

                while (queue.length > 0) { // while the queue is not empty
                    const currentNode = queue.shift(); // remove the first node from the queue
                    stack.push(currentNode); // add the current node to the stack
                    console.log(graph.get(node));
                    console.log(node);
                    const adjList = graph.get(node);

                    for(let i=0; i<=adjList.length; i++) { // for each neighbour of the current node
                        if (distance.get(adjList[i]) < 0) { // if the distance of the neighbour is less than 0
                            queue.push(adjList[i]); // add the neighbour to the queue
                            distance.set(adjList[i], distance.get(currentNode) + 1); // set the distance of the neighbour to the distance of the current node + 1
                        }
                        if (distance.get(adjList[i]) === distance.get(currentNode) + 1) { // if the distance of the neighbour is equal to the distance of the current node + 1
                            numShortestPaths.set(adjList[i], numShortestPaths.get(adjList[i]) + numShortestPaths.get(currentNode)); // increment the number of shortest paths of the neighbour by the number of shortest paths of the current node
                            predecessors.get(adjList[i]).push(currentNode); // add the current node to the predecessors of the neighbour
                        }
                    };
                }
                while (stack.length > 0) { // while the stack is not empty
                    const currentNode = stack.pop(); // remove the last node from the stack
                    for (let predecessor of predecessors.keys(currentNode)) { // iterate over the keys of the predecessors map
                        const dependency = (numShortestPaths.get(predecessor) / numShortestPaths.get(currentNode)) * (1 + dependencies.get(currentNode)); // calculate the dependency of the current node
                        dependencies.set(predecessor, dependencies.get(predecessor) + dependency); // increment the dependency of the predecessor by the dependency of the current node
                    }
                    if (currentNode !== node) { // if the current node is not the current node
                        betweenness.set(currentNode, betweenness.get(currentNode) + dependencies.get(currentNode)); // increment the betweenness centrality of the current node by the dependency of the current node
                    }
                }
            });
            const betweennessy = Array.from(graph.keys()).map((node) => [node, betweenness.get(node)]);
            return getCentralityRanks(betweennessy);
                
        }

    static inboundClosenessCentrality(graph) {
        // inbound closeness centrality = Similar to betweenness centrality, but with a focus on inbound edges
    }

    static outboundClosenessCentrality(graph) {
        // outbound closeness centrality = Similar to betweenness centrality, but with a focus on outbound edges

    }

    static eigenvectorCentrality(graph) {
        // eigenvector centrality = a measure of the influence of a node in a network

    }

    static commonNodeIDs(graph) {
        // jacob
    }

    static jaccardSimilarity(graph) {
        // paige
        // jaccard similarity = (common nodes) / (total nodes)




    }

    static stronglyConnectedComponents(graph) {
        // strongly connected components = a set of nodes in a directed graph that are all reachable from each other

    }}
