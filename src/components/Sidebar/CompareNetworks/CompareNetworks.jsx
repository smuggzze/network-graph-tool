import Run from "../../Run/Run";
import { NetworkComparisonAlgorithms } from "../../../utils/networkComparisonAlgorithms";
import RunWrapper from "../../../wrappers/RunWrapper/RunWrapper";
import { useContext } from "react";
import { GraphContext } from "../../Main/Main";
import { convertToAdjList } from "../../../utils/convertToAdjList";

// Object that is used by the UI to run the associated network comparison algorithm when the
// 'run' button is clicked by the user.
const comparisonMethods = Object.freeze({
    "In-degree Centrality": NetworkComparisonAlgorithms.inDegreeCentrality,
    "Out-degree Centrality": NetworkComparisonAlgorithms.outDegreeCentrality,
    "Betweenness Centrality": NetworkComparisonAlgorithms.betweennessCentrality,
    "Inbound Closeness Centrality": NetworkComparisonAlgorithms.inboundClosenessCentrality,
    "Outbound Closeness Centrality": NetworkComparisonAlgorithms.outboundClosenessCentrality,
    "Eigenvector Centrality": NetworkComparisonAlgorithms.eigenvectorCentrality,
    "Common Node ID's": NetworkComparisonAlgorithms.commonNodeIDs, 
    "Jaccard Similarity": NetworkComparisonAlgorithms.jaccardSimilarity,
    "Strongly Connected Components": NetworkComparisonAlgorithms.stronglyConnectedComponents
});

function CompareNetworks() {
    const graphContext = useContext(GraphContext);

    function runNetworkComparisonAlgorithm(label, method) {
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
                            runAlgorithm={() => runNetworkComparisonAlgorithm(x, comparisonMethods[x])}
                            key={x}
                        />
                    )
                })}
            </RunWrapper>
        </div>
    )
}

export default CompareNetworks;