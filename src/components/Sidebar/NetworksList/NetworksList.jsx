import NetworkListItem from "./NetworkListItem";
import styles from "./NetworksList.module.css";
import { useContext } from "react";
import { GraphContext } from "../../Main/Main";

function NetworksList({ networkNames, toggleNetworkPopUp }) {
    const graphContext = useContext(GraphContext);

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
            <button className={styles.addNetwork} onClick={toggleNetworkPopUp}>
                + Add a network
            </button>}
        </>
    )
}

export default NetworksList;