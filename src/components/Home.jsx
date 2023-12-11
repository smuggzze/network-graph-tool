import Graph from "./Graph/Graph";
import styles from "./Home.module.css";
import Sidebar from "./Sidebar/Sidebar";
import DetailsSidebar from "./DetailsSidebar/DetailsSidebar";
import { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

function Home() {
    const windowSize = useWindowSize();
    const [selectedGraph, setSelectedGraph] = useState({});
    const [canvasOffset, setCanvasOffset] = useState(700);

    const [graphs, setGraphs] = useState([{
        nodes: [{ id: 1, size: 10 }, { id : 2, size: 10 }, { id: 3, size: 10 }, { id: 4, size: 10 }, { id: 5, size: 10 }, { id: 6, size: 10 }],
        links: [{ source: 1, target: 3 }, { source: 2, target: 1 }, { source: 1, target: 2 }, { source: 5, target: 4 }, { source: 2, target: 6 }],
        networkName: "Example network 1",
        isDirected: true,
    },
    {
        nodes: [{ id: 1, size: 10 }, { id : 2, size: 10 }, { id: 3, size: 10 }],
        links: [{ source: 1, target: 3 }, { source: 2, target: 1 }],
        networkName: "Example network 2",
        isDirected: false
    }]);

    return (
        <div className={styles.mainPage}>
            <Sidebar networkNames={graphs.map((graph) => graph.networkName)} />
            <div className={styles.graphs} style={{ width: `${windowSize - canvasOffset}px` }}>
                {graphs.map((graph, index) => {
                    return (
                        <Graph 
                            graph={graph}
                            isLastGraph={index == graphs.length - 1}
                            width={(windowSize - canvasOffset - 60) / graphs.length}
                            key={graph.networkName}
                        />
                    )
                })}
            </div>
            <DetailsSidebar
                canvasOffset={canvasOffset} 
                setCanvasOffset={setCanvasOffset} 
            />
        </div>
    )
}

export default Home;