import styles from "../DetailsSidebar.module.css";
import GraphDetailsPair from "./GraphDetailsPair";
import { useContext } from "react";
import { GraphContext } from "../../Main/Main";

function GraphDetails() {
    const graphContext = useContext(GraphContext);

    return (
        <div className={styles.detailsWrapper} style={{ marginTop: "76px" }}>
            <h2 className="sidebarSubTitle">
                Network Details
            </h2>
            <div className={styles.detailPairs}>
                <GraphDetailsPair label="Network Name" value={graphContext.selectedGraph.networkName} />
                <GraphDetailsPair label="Nodes" value={graphContext.selectedGraph.nodes.length} />
                <GraphDetailsPair label="Edges" value={graphContext.selectedGraph.links.length} />
                <GraphDetailsPair label="Graph Type" value={graphContext.selectedGraph.isDirected ? "Directed" : "Undirected"} />
                <GraphDetailsPair label="Directed Acyclic Graph (DAG)" value={graphContext.selectedGraph.isDAG ? "Yes" : "No"} />
            </div>
        </div>
    )
}

export default GraphDetails;