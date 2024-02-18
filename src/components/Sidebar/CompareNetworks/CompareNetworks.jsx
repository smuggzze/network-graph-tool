import Run from "../../Run/Run";
import { NetworkComparisonAlgorithms } from "../../../utils/networkComparisonAlgorithms";
import RunWrapper from "../../../wrappers/RunWrapper/RunWrapper";
import { useContext } from "react";
import { GraphContext } from "../../Main/Main";
import { convertToAdjList } from "../../../utils/convertToAdjList";

// Object that is used by the UI to run the associated network comparison algorithm when the
// 'run' button is clicked by the user.
const comparisonMethods = {
    "In-degree Centrality": {
        run: NetworkComparisonAlgorithms.inDegreeCentrality,
        moreInfo: "In-degree centrality measures the number of inbound connections to a node in a directed network. Nodes with higher in-degree centrality are more influential or important.",
    },
    "Out-degree Centrality": {
        run: NetworkComparisonAlgorithms.outDegreeCentrality,
        moreInfo: "Out-degree centrality measures the number of outbound connections from a node in a directed network. Nodes with higher out-degree centrality may have more influence over other nodes.",
    },
    "Betweenness Centrality": {
        run: NetworkComparisonAlgorithms.betweennessCentrality,
        moreInfo: "Betweenness centrality quantifies the influence of a node in controlling the flow of information between other nodes in a network. Nodes with higher betweenness centrality act as bridges or bottlenecks in the network.",
    },
    "Inbound Closeness Centrality": {
        run: NetworkComparisonAlgorithms.inboundClosenessCentrality,
        moreInfo: "Inbound closeness centrality measures how close a node is to all other nodes in terms of inbound connections in a directed network. Nodes with higher inbound closeness centrality are more reachable from other nodes.",
    },
    "Outbound Closeness Centrality": {
        run: NetworkComparisonAlgorithms.outboundClosenessCentrality,
        moreInfo: "Outbound closeness centrality measures how close a node is to all other nodes in terms of outbound connections in a directed network. Nodes with higher outbound closeness centrality can reach other nodes more efficiently.",
    },
    "Eigenvector Centrality": {
        run: NetworkComparisonAlgorithms.eigenvectorCentrality,
        moreInfo: "Eigenvector centrality measures the importance of a node in a network based on the concept that connections to high-scoring nodes contribute more to a node's score. Nodes with higher eigenvector centrality are connected to other important nodes.",
    },
    "Common Node ID's": {
        run: NetworkComparisonAlgorithms.commonNodeIDs,
        moreInfo: "Common node IDs measure the similarity between two networks based on the number of common nodes they share. It is useful for identifying commonalities or overlaps between different networks.",
    }, 
    "Jaccard Similarity": {
        run: NetworkComparisonAlgorithms.jaccardSimilarity,
        moreInfo: "Jaccard similarity measures the similarity between two sets based on the ratio of the intersection to the union of the sets. In network analysis, it quantifies the similarity between two sets of nodes or edges in different networks.",
    },
    "SCCs": {
        run: NetworkComparisonAlgorithms.stronglyConnectedComponents,
        moreInfo: "Strongly connected components (SCCs) are subgraphs in a directed graph where every node is reachable from every other node within the subgraph. SCCs provide insights into the connectivity structure of directed networks.",
    }
};

function CompareNetworks() {
    const graphContext = useContext(GraphContext);

    function runNetworkComparisonAlgorithm(method) {
        const result = graphContext.graphs.map((graph) => {
            const adjList = convertToAdjList(graph);
            return method(adjList);
        });

        graphContext.setGraphs((graphs) => graphs.map((graph, index) => {
            return {
                ...graph,
                styles: { ...result[index] }
            }
        }));
    }

    return (
        <div>
            <h2 className="sidebarSubTitle">
                Compare
            </h2>
            <RunWrapper>
                {Object.keys(comparisonMethods).map((x) => {
                    return (
                        <Run
                            label={x}
                            moreInfo={comparisonMethods[x].moreInfo}
                            runAlgorithm={() => runNetworkComparisonAlgorithm(comparisonMethods[x].run)}
                            key={x}
                        />
                    )
                })}
            </RunWrapper>
        </div>
    )
}

export default CompareNetworks;