import styles from "./RunAlgorithms.module.css";
import { useState, useContext, useEffect } from "react";
import { convertToAdjList } from "../../utils/convertToAdjList";
import { GraphContext } from "../Main/Main";

function Run({ label, algorithm, isNetworkStatistic }) {
    const graphContext = useContext(GraphContext);
    const [statistic, setStatistic] = useState(null);

    function runAlgorithm() {
        const graph = convertToAdjList(graphContext.selectedGraph);
        const result = algorithm(graph, graphContext.selectedGraph.isDirected);
        
        if (isNetworkStatistic) {
            setStatistic(result);
        }
    }

    useEffect(() => {
        setStatistic(null);
    }, [graphContext.selectedGraph]);

    return (
        <div className={styles.runAlgorithm}>
            <p className="side-text">
                {label}
            </p>
            <div className={styles.runResultWrapper}>
                {statistic != null ? <p>{statistic}</p> : isNetworkStatistic && <p>?</p>}
                <button className={`${styles.runButton} primary-btn`} onClick={runAlgorithm}>
                    Run
                </button>
            </div>
        </div>
    )
}

export default Run;