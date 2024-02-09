import { useState, useContext, useEffect } from "react";
import { convertToAdjList } from "../../../utils/convertToAdjList";
import { GraphContext } from "../../Main/Main";
import Run from "../../Run/Run";

function NetworkStatistic({ label, algorithm }) {
    const graphContext = useContext(GraphContext);
    // Keeps track of the numerical value returned by the network statistic algorithm.
    const [statistic, setStatistic] = useState(null);

    // Converts the graph used by the UI into an adjacency list
    // and passes it into the graph algorithm prop function.
    function runAlgorithm() {
        const graph = convertToAdjList(graphContext.selectedGraph);
        const result = algorithm(graph, graphContext.selectedGraph.isDirected);
        
        // Show numerical result in UI.
        setStatistic(result);
    }

    useEffect(() => {
        setStatistic(null);
    }, [graphContext.selectedGraph]);

    return (
        <Run
            label={label}
            runAlgorithm={runAlgorithm}
            data={statistic}
        />
    )
}

export default NetworkStatistic;