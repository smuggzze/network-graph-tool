import Graph from "../Graph/Graph";
import styles from "./Main.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DetailsSidebar from "../DetailsSidebar/DetailsSidebar";
import { useState, createContext, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import AddNetwork from "../AddNetwork/AddNetwork";
import TutorialPopUp from "../TutorialPopUp/TutorialPopUp";

// Will be used to allow all child components to access the graph data.
export const GraphContext = createContext({});
// The size of each node in the graph visualisation.
export const nodeSize = 6;

function Main() {
    const windowSize = useWindowSize();
    const [selectedGraph, setSelectedGraph] = useState(null);
    const [canvasOffset, setCanvasOffset] = useState(700);
    const [addNetworkPopUp, setAddNetworkPopUp] = useState(false);
    const [graphs, setGraphs] = useState(JSON.parse(localStorage.getItem("graphs")) || []);
    const [addTutorialPopUp, setTutorialPopUp] = useState(true);
    const [selectedNode, setSelectedNode] = useState(null);

    useEffect(() => {
        // If no graph is selected and the user has at least one graph uploaded, 
        // then automatically choose the first graph. Runs when a graph is added or deleted.
        if (selectedGraph == null && graphs.length > 0) {
            setSelectedGraph(graphs[0]);
        }
    }, [graphs, selectedGraph]);

    console.log(graphs);

    return (
        <GraphContext.Provider value={{selectedGraph, setSelectedGraph, graphs, setGraphs}}>
            {addTutorialPopUp && <TutorialPopUp setTutorialPopUp={setTutorialPopUp} />}
            {addNetworkPopUp && <AddNetwork setAddNetworkPopUp={setAddNetworkPopUp} />}
            <div className={styles.mainPage}>
                <Sidebar 
                    networkNames={graphs.map((graph) => graph.networkName)}
                    setAddNetworkPopUp={setAddNetworkPopUp} 
                    setTutorialPopUp={setTutorialPopUp}
                />
                {selectedGraph != null ?
                <>
                    <div className={styles.graphs} style={{ width: `${windowSize - canvasOffset}px` }}>
                        {graphs.map((graph, index) => {
                            return (
                                <Graph 
                                    graph={graph}
                                    isLastGraph={index == graphs.length - 1}
                                    width={(windowSize - canvasOffset - 30) / graphs.length}
                                    selectedNode={selectedNode}
                                    setSelectedNode={setSelectedNode}
                                    key={graph.networkName}
                                />
                            )
                        })}
                    </div>
                    <DetailsSidebar
                        canvasOffset={canvasOffset} 
                        setCanvasOffset={setCanvasOffset} 
                        selectedNode={selectedNode}
                    />
                </> :
                <div className={styles.noNetworksFound}>
                    <div>
                        <p className={styles.noNetworksText}>
                            You currently have no networks to show...
                        </p>
                        <button className={`${styles.startVisualising} primaryBtn`} onClick={() => setAddNetworkPopUp(true)}>
                            Start Visualising
                        </button>
                    </div>
                </div>}
            </div>
        </GraphContext.Provider>
    )
}

export default Main;