import { graphColours } from "./graphColours";

export class NetworkComparisonAlgorithms { 

    static outDegreeCentrality(graph) { // function to calculate the out-degree centrality of a graph

        // out-degree centrality = number of edges that leave the node
        return Object.fromEntries(new Map(Array.from(graph.keys()).map((node) => { // create a map of nodes with their out-degree centrality
            const outDegree = graph.get(node).length;  // get the out-degree centrality of the node
            const bgColours = graphColours.Centrality; // get the background colours for the out-degree centrality

            const colour = outDegree >= 10 ? bgColours["Very high"] : // set the colour based on the out-degree centrality
            outDegree >= 8 ? bgColours["High"] : outDegree >= 6 ?
            bgColours["Medium"] : bgColours["Low"];

            return [ // return the node and its out-degree centrality
                node,
                { ...colour }
            ];
        })));
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

        return Object.fromEntries(new Map(Array.from(graph.keys()).map((node) => { // create a map of nodes with their in-degree centrality
            const inDegree = nodes.get(node); // get the in-degree centrality of the node
            const bgColours = graphColours.Centrality; // get the background colours for the in-degree centrality

            const colour = inDegree >= 10 ? bgColours["Very high"] :  // set the colour based on the in-degree centrality
            inDegree >= 8 ? bgColours["High"] : inDegree >= 6 ? // set the colour based on the in-degree centrality
            bgColours["Medium"] : bgColours["Low"]; // set the colour based on the in-degree centrality

            return [ // return the node and its in-degree centrality
                node,
                { ...colour }
            ];
        })));
    }      

    static betweennessCentrality(graph) {

            const betweenness = new Map(); // create a map of nodes with their betweenness centrality

            
            graph.nodes().forEach(node => betweenness.set(node, 0)); // initialize the betweenness centrality of each node to 0
            graph.nodes().forEach(node => { // for each node in the graph
                const dependencies = new Map(); 
                const numShortestPaths = new Map();
                const distance = new Map();
                const predecessors = new Map();

                graph.nodes().filter(n => n !== node).forEach(n => { // for each node in the graph that is not the current node
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

                    graph.neighbors(currentNode).forEach(neighbour => { // for each neighbour of the current node
                        if (distance.get(neighbour) < 0) { // if the distance of the neighbour is less than 0
                            queue.push(neighbour); // add the neighbour to the queue
                            distance.set(neighbour, distance.get(currentNode) + 1); // set the distance of the neighbour to the distance of the current node + 1
                        }
                        if (distance.get(neighbour) === distance.get(currentNode) + 1) { // if the distance of the neighbour is equal to the distance of the current node + 1
                            numShortestPaths.set(neighbour, numShortestPaths.get(neighbour) + numShortestPaths.get(currentNode)); // increment the number of shortest paths of the neighbour by the number of shortest paths of the current node
                            predecessors.get(neighbour).push(currentNode); // add the current node to the predecessors of the neighbour
                        }
                    });
                }
                while (stack.length > 0) { // while the stack is not empty
                    const currentNode = stack.pop(); // remove the last node from the stack
                    predecessors.get(currentNode).forEach(predecessor => { // for each predecessor of the current node
                        const dependency = (numShortestPaths.get(predecessor) / numShortestPaths.get(currentNode)) * (1 + dependencies.get(currentNode)); // calculate the dependency of the current node
                        dependencies.set(predecessor, dependencies.get(predecessor) + dependency); // increment the dependency of the predecessor by the dependency of the current node
                    });
                    if (currentNode !== node) { // if the current node is not the current node
                        betweenness.set(currentNode, betweenness.get(currentNode) + dependencies.get(currentNode)); // increment the betweenness centrality of the current node by the dependency of the current node
                    }
                }
            });
            const betweennessy = Array.from(graph.keys()).map((node) => [node, betweenness.get(node)]);
            return getCentralityRank(betweennessy)
        
         
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
        const nodes = new Map(Array.from(graph.keys()).map((node) => [node, 0])); // create a map of nodes with a value of 0
        totalNodes = nodes.size



    }

    static stronglyConnectedComponents(graph) {
        // strongly connected components = a set of nodes in a directed graph that are all reachable from each other

    }
