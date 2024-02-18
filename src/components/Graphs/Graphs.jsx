import useWindowSize from "../../hooks/useWindowSize";
import { memo } from "react";
import styles from "./Graphs.module.css";
import Graph from "./Graph";

export default memo(function Graphs({ graphs, resetGraph, selectedNode, updateSelectedNode, canvasOffset }) {
    const [windowWidth, windowHeight] = useWindowSize();

    return (
        <div className={styles.graphs} style={{ width: `${windowWidth - canvasOffset}px` }}>
            {graphs.map((graph, index) => {
                return (
                    <Graph 
                        graph={graph}
                        resetGraph={resetGraph}
                        isLastGraph={index == graphs.length - 1}
                        width={(windowWidth - canvasOffset) / graphs.length}
                        height={windowHeight}
                        selectedNode={selectedNode}
                        updateSelectedNode={updateSelectedNode}
                        key={graph.networkName}
                    />
                )
            })}
        </div>
    )
});