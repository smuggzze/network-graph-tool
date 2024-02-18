import styles from "./Main.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DetailsSidebar from "../DetailsSidebar/DetailsSidebar";
import { useState, createContext, useEffect } from "react";
import CreateNetwork from "../CreateNetwork/CreateNetwork";
import TutorialPopUp from "../TutorialPopUp/TutorialPopUp";
import Graphs from "../Graphs/Graphs";

// Will be used to allow all child components to access the graph data.
export const GraphContext = createContext({});
// The size of each node in the graph visualisation.
export const nodeSize = 8;

function Main() {
    const [selectedGraph, setSelectedGraph] = useState(null);
    const [canvasOffset, setCanvasOffset] = useState(720);
    const [createNetworkPopUp, setCreateNetworkPopUp] = useState(false);
    const [graphs, setGraphs] = useState(JSON.parse(localStorage.getItem("graphs")) || []);
    const [addTutorialPopUp, setTutorialPopUp] = useState(true);
    const [selectedNode, setSelectedNode] = useState(null);

    function updateSelectedNode(node) {
        setSelectedNode(node);
    }

    function resetGraph(graph) {
        setGraphs((graphs) => graphs.map((curGraph) => {
            if (curGraph.networkName === graph.networkName) {
                return {
                    ...curGraph,
                    styles: Object.fromEntries(new Map(Object.keys(curGraph.styles).map((node) => {
                        return [
                            node,
                            {
                                fillStyle: "white",
                                strokeStyle: "#1E90FF",
                                textStyle: "#121212",
                                size: nodeSize
                            }
                        ]
                    })))
                }
            }

            return curGraph;
        }));
    }

    useEffect(() => {
        // If no graph is selected and the user has at least one graph uploaded, 
        // then automatically choose the first graph. Runs when a graph is added or deleted.
        if (selectedGraph == null && graphs.length > 0) {
            setSelectedNode(null);
            setSelectedGraph(graphs[0]);
        }
    }, [graphs, selectedGraph]);

    return (
        <GraphContext.Provider value={{selectedGraph, setSelectedGraph, graphs, setGraphs}}>
            {addTutorialPopUp && <TutorialPopUp setTutorialPopUp={setTutorialPopUp} />}
            {createNetworkPopUp && <CreateNetwork setCreateNetworkPopUp={setCreateNetworkPopUp} />}
            <div className={styles.mainPage}>
                <Sidebar 
                    networkNames={graphs.map((graph) => graph.networkName)}
                    setAddNetworkPopUp={setCreateNetworkPopUp} 
                    setTutorialPopUp={setTutorialPopUp}
                />
                {selectedGraph != null ?
                <>
                    <Graphs
                        graphs={graphs}
                        resetGraph={resetGraph}
                        selectedNode={selectedNode}
                        updateSelectedNode={updateSelectedNode}
                        canvasOffset={canvasOffset}
                    />
                    <DetailsSidebar
                        canvasOffset={canvasOffset} 
                        setCanvasOffset={setCanvasOffset} 
                        selectedNode={selectedNode}
                        updateSelectedNode={updateSelectedNode}
                        resetGraph={resetGraph}
                    />
                </> :
                <div className={styles.noNetworksFound}>
                    <div>
                        <p className={styles.noNetworksText}>
                            You currently have no networks to show...
                        </p>
                        <button className={`${styles.startVisualising} primaryBtn`} onClick={() => setCreateNetworkPopUp(true)}>
                            Start Visualising
                        </button>
                    </div>
                </div>}
            </div>
        </GraphContext.Provider>
    )
}

export default Main;