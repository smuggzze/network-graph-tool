import Graph from "../Graph/Graph";
import styles from "./Main.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DetailsSidebar from "../DetailsSidebar/DetailsSidebar";
import { useState, createContext, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import AddNetwork from "../AddNetwork/AddNetwork";
import TutorialPopUp from "../TutorialPopUp/TutorialPopUp";

export const GraphContext = createContext({});
export const nodeSize = 10;

function Main() {
    const windowSize = useWindowSize();
    const [selectedGraph, setSelectedGraph] = useState(null);
    const [canvasOffset, setCanvasOffset] = useState(700);
    const [addNetworkPopUp, setAddNetworkPopUp] = useState(false);
    const [graphs, setGraphs] = useState([]);
    const [addTutorialPopUp, setTutorialPopUp] = useState(true);
    
    function toggleNetworkPopUp() {
        setAddNetworkPopUp((cur) => !cur);
    }

    function toggleTutorial() {
        setTutorialPopUp((cur) => !cur);
    }

    useEffect(() => {
        if (selectedGraph == null && graphs.length > 0) {
            setSelectedGraph(graphs[0]);
        }
    }, [graphs, selectedGraph]);

    return (
        <GraphContext.Provider value={{selectedGraph, setSelectedGraph, graphs, setGraphs}}>
            {addTutorialPopUp && <TutorialPopUp toggleTutorial={toggleTutorial} />}
            {addNetworkPopUp && <AddNetwork toggleNetworkPopUp={toggleNetworkPopUp} />}
            <div className={styles.mainPage}>
                <Sidebar 
                    networkNames={graphs.map((graph) => graph.networkName)}
                    toggleNetworkPopUp={toggleNetworkPopUp} 
                    toggleTutorial={toggleTutorial}
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
                                    key={graph.networkName}
                                />
                            )
                        })}
                    </div>
                    <DetailsSidebar
                        canvasOffset={canvasOffset} 
                        setCanvasOffset={setCanvasOffset} 
                    />
                </> :
                <div className={styles.noNetworksFound}>
                    <div>
                        <p className={styles.noNetworksText}>
                            You currently have no networks to show...
                        </p>
                        <button className={`${styles.startVisualising} primary-btn`} onClick={toggleNetworkPopUp}>
                            Start Visualising
                        </button>
                    </div>
                </div>}
            </div>
        </GraphContext.Provider>
    )
}

export default Main;