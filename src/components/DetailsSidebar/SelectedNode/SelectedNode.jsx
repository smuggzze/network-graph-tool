import styles from "../DetailsSidebar.module.css";
import NodeInfo from "./NodeInfo";
import { useEffect, useState, useCallback, useContext } from "react";
import { GraphContext } from "../../Main/Main";
import { convertToAdjList } from "../../../utils/convertToAdjList";
import { nodeStatisticAlgorithms } from "../../../utils/nodeStatisticAlgorithms";
import { updateGraphLocalStorage } from "../../../utils/updateGraphLocalStorage";

function SelectedNode({ selectedNode, updateSelectedNode, resetGraph }) {
    const graphContext = useContext(GraphContext);
    const [nodeID, setNodeID] = useState(selectedNode == null ? selectedNode : selectedNode.id);
    const [neighbours, setNeighbours] = useState([]);
    const [outDegree, setOutDegree] = useState(0);
    const [inDegree, setInDegree] = useState(0);
    const [clusteringCo, setClusteringCo] = useState(0);

    function deleteNode() {
        const stylesCpy = { ...graphContext.selectedGraph.styles };
        delete stylesCpy[selectedNode.id];

        const updatedGraph = {
            ...graphContext.selectedGraph,
            links: graphContext.selectedGraph.links
                    .filter((x) => x.source.id !== selectedNode.id && x.target.id !== selectedNode.id)
                    .map((x) => { return { source: x.source.id, target: x.target.id }}),
            nodes: graphContext.selectedGraph.nodes.filter((node) => node.id !== selectedNode.id)
                    .map((node) => { return { id: node.id }}),
            styles: stylesCpy
        };

        graphContext.setSelectedGraph(updatedGraph);
        graphContext.setGraphs((graphs) => graphs.map((graph) => {
            if (graph.networkName !== graphContext.selectedGraph.networkName) return graph;
            else return updatedGraph;
        }));

        updateSelectedNode(null);
        updateGraphLocalStorage(updatedGraph, graphContext.selectedGraph.networkName);
        resetGraph(graphContext.selectedGraph);
    }

    const updateNodeStatistics = useCallback(() => {
        if (graphContext.selectedGraph != null && selectedNode != null) {
            const graph = convertToAdjList(graphContext.selectedGraph);
            const neighbours = graph.get(selectedNode.id);

            if (neighbours != null) {
                setClusteringCo(nodeStatisticAlgorithms.clusteringCoefficient(selectedNode.id, graph));
                setInDegree(nodeStatisticAlgorithms.inDegree(selectedNode.id, graph, graphContext.selectedGraph.isDirected));
                setOutDegree(neighbours.length);
                setNeighbours(neighbours);
                setNodeID(selectedNode.id);
            }
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
            <NodeInfo label="Neighbours" value={neighbours.toString()} />
            <NodeInfo label="Out-degree" value={outDegree} />
            <NodeInfo label="In-degree" value={inDegree} />
            <NodeInfo label="Clustering Co." value={clusteringCo} />
            <button className="btn removeBtn" style={{ marginTop: "15px", marginLeft: "15px" }} onClick={deleteNode}>
                Delete node
            </button>
        </div>
    )
}

export default SelectedNode;