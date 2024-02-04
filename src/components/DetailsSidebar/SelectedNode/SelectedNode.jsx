import styles from "../DetailsSidebar.module.css";
import NodeInfo from "./NodeInfo";
import { useEffect, useState, useCallback, useContext } from "react";
import { GraphContext } from "../../Main/Main";
import { convertToAdjList } from "../../../utils/convertToAdjList";
import { nodeStatisticAlgorithms } from "../../../utils/nodeStatisticAlgorithms";

function SelectedNode({ selectedNode }) {
    const graphContext = useContext(GraphContext);
    const [nodeID, setNodeID] = useState(selectedNode == null ? selectedNode : selectedNode.id);
    const [neighbours, setNeighbours] = useState([]);
    const [outDegree, setOutDegree] = useState(0);
    const [inDegree, setInDegree] = useState(0);
    const [clusteringCo, setClusteringCo] = useState(0);

    const updateNodeStatistics = useCallback(() => {
        if (graphContext.selectedGraph != null && selectedNode != null) {
            const graph = convertToAdjList(graphContext.selectedGraph);
            const neighbours = graph.get(selectedNode.id);

            setClusteringCo(nodeStatisticAlgorithms.clusteringCoefficient(selectedNode.id, graph));
            setInDegree(nodeStatisticAlgorithms.inDegree(selectedNode.id, graph, graphContext.selectedGraph.isDirected));
            setOutDegree(neighbours.length);
            setNeighbours(neighbours);
            setNodeID(selectedNode.id);
        }

    }, [graphContext.selectedGraph, selectedNode]);

    useEffect(() => {
        updateNodeStatistics();
    }, [updateNodeStatistics]);

    return (
        <div className={styles.detailsWrapper} style={{ borderBottom: "none" }}>
            <h2 className="sidebarSubTitle" style={{ marginTop: "15px" }}>
                Selected Node
            </h2>
            <NodeInfo label="Node ID" value={nodeID} />
            <NodeInfo label="Neighbours" value={`{${neighbours.toString()}}`} />
            <NodeInfo label="Out-degree" value={outDegree} />
            <NodeInfo label="In-degree" value={inDegree} />
            <NodeInfo label="Clustering Co." value={clusteringCo} />
        </div>
    )
}

export default SelectedNode;