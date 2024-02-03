import styles from "./RunAlgorithms.module.css";
import { useState, useContext, useEffect } from "react";
import { convertToAdjList } from "../../utils/convertToAdjList";
import { GraphContext } from "../Main/Main";

function Run({ label, algorithm, isNetworkStatistic }) {
    const graphContext = useContext(GraphContext);
    // Keeps track of the numerical value returned by the network statistic algorithm.
    const [statistic, setStatistic] = useState(null);

    // Converts the graph used by the UI into an adjacency list
    // and passes it into the graph algorithm prop function.
    function runAlgorithm() {
        const graph = convertToAdjList(graphContext.selectedGraph);
        const result = algorithm(graph, graphContext.selectedGraph.isDirected);
        
        // If the algorithm is a network statistic, show numerical result in UI.
        if (isNetworkStatistic) {
            setStatistic(result);
        }
    }

    useEffect(() => {
        setStatistic(null);
    }, [graphContext.selectedGraph]);

    return (
        <div className={styles.runAlgorithm}>
            <p className="sideText">
                {label}
            </p>
            <div className={styles.runResultWrapper}>
                {statistic != null ? <p>{statistic}</p> : isNetworkStatistic && <p>?</p>}
                <button className={`${styles.runButton} primaryBtn`} onClick={runAlgorithm}>
                    Run
                </button>
            </div>
        </div>
    )
}

export default Run;