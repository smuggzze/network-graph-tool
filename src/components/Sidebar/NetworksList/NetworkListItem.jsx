import { GraphContext } from "../../Main/Main";
import styles from "./NetworksList.module.css";
import { useContext } from "react";

function NetworkListItem({ networkName, updateSelectedGraph, isSelected }) {
    const graphContext = useContext(GraphContext);

    function removeNetwork() {
        graphContext.setGraphs((cur) => cur.filter((x) => x.networkName !== networkName));
        if (graphContext.selectedGraph.networkName === networkName) {
            graphContext.setSelectedGraph(null);
        }
    }

    return (
        <div className={styles.listItem}>
            <p style={isSelected ? { fontWeight: "bold" } : {}} 
            onClick={() => updateSelectedGraph(networkName)}>
                {networkName}
            </p>
            <button className={`btn ${styles.removeBtn}`} onClick={removeNetwork}>
                Remove
            </button>
        </div>
    )
}

export default NetworkListItem;