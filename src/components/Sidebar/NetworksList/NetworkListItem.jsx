import { GraphContext } from "../../Main/Main";
import styles from "./NetworksList.module.css";
import { useContext } from "react";

function NetworkListItem({ networkName, updateSelectedGraph, isSelected }) {
    const graphContext = useContext(GraphContext);

    // Removes the network from the user's list of networks.
    function removeGraph() {
        // Updates local storage to match current state.
        const graphs = JSON.parse(localStorage.getItem("graphs")) || [];
        localStorage.setItem("graphs", JSON.stringify(graphs.filter((graph) => graph.networkName !== networkName)));

        // Updates graph list state by filtering graphs by name.
        graphContext.setGraphs((cur) => cur.filter((x) => x.networkName !== networkName));

        // If the deleted graph is the current graph selected, reset the selected graph.
        if (graphContext.selectedGraph.networkName === networkName) {
            graphContext.setSelectedGraph(null);
        }
    }

    return (
        <div className={styles.listItem}>
            <p style={isSelected ? { fontWeight: "bold" } : {}} onClick={() => updateSelectedGraph(networkName)}>
                {networkName}
            </p>
            <button className={`btn ${styles.removeBtn}`} onClick={removeGraph}>
                Remove
            </button>
        </div>
    )
}

export default NetworkListItem;