import NetworkListItem from "./NetworkListItem";
import styles from "./NetworksList.module.css";
import { useContext, useRef, useState } from "react";
import { GraphContext } from "../../Main/Main";
import { parseJsonFile } from "../../../utils/parseJsonFile";
import Error from "../../ErrorPopUp/ErrorPopUp";

function NetworksList({ networkNames, setAddNetworkPopUp }) {
    const graphContext = useContext(GraphContext);
    const [errorMessage, setErrorMessage] = useState("");
    const importNetworkRef = useRef(null);

    // Updates the selected graph to the graph that the user selected.
    function updateSelectedGraph(networkName) {
        graphContext.setSelectedGraph(graphContext.graphs.find((x) => x.networkName === networkName));
    }

    async function importNetwork() {
        if (importNetworkRef.current && importNetworkRef.current.files) {
            const file = importNetworkRef.current.files[0];
            const graphData = await parseJsonFile(file);
            const graphNameExists = graphContext.graphs.find((graph) => graph.networkName === graphData.networkName) !== undefined;
            
            if (!graphNameExists) {
                const graphs = JSON.parse(localStorage.getItem("graphs")) || [];
                localStorage.setItem("graphs", JSON.stringify([...graphs, graphData]));

                graphContext.setGraphs((graphs) => [
                    ...graphs, 
                    graphData
                ]);
            } else {
                setErrorMessage("A graph with this name already exists.");
            }
        }
    }

    function triggerFileUpload() {
        if (importNetworkRef.current) {
            importNetworkRef.current.click();
        }
    }

    return (
        <>
            {errorMessage !== "" &&
            <Error 
                errorMessage={errorMessage} 
                setErrorMessage={setErrorMessage}
            />}
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
            <div className={styles.networkActions}>
                <button className={styles.addNetwork} onClick={() => setAddNetworkPopUp(true)}>
                    + Create a network
                </button>
                <button className={styles.addNetwork} onClick={triggerFileUpload}>
                    + Import existing network (JSON file)
                </button>
                <input type="file" hidden={true} ref={importNetworkRef} onChange={importNetwork} />
            </div>}
        </>
    )
}

export default NetworksList;