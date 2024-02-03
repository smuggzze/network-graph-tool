import NetworkListItem from "./NetworkListItem";
import styles from "./NetworksList.module.css";
import { useContext } from "react";
import { GraphContext } from "../../Main/Main";

function NetworksList({ networkNames, setAddNetworkPopUp }) {
    const graphContext = useContext(GraphContext);

    // Updates the selected graph to the graph that the user selected.
    function updateSelectedGraph(networkName) {
        graphContext.setSelectedGraph(graphContext.graphs.find((x) => x.networkName === networkName));
    }

    return (
        <>
            <h2 className="sidebarSubTitle">
                Networks (max 2)
            </h2>
            {networkNames.map((name) => {
                return (
                    <NetworkListItem
                        networkName={name}
                        updateSelectedGraph={updateSelectedGraph}
                        isSelected={graphContext.selectedGraph?.networkName === name}
                        key={name}
                    />
                )
            })}
            {networkNames.length < 2 &&
            <button className={styles.addNetwork} onClick={() => setAddNetworkPopUp(true)}>
                + Add a network
            </button>}
        </>
    )
}

export default NetworksList;