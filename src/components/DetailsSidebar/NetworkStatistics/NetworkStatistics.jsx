import RunAlgorithms from "../../RunAlgorithms/RunAlgorithms";
import styles from "../DetailsSidebar.module.css";
import { NetworkStatisticAlgorithms } from "../../../utils/networkStatisticAlgorithms";

// Object that is used by the UI to run the associated network statistic algorithm when the
// 'run' button is clicked by the user.
const networkStatistics = Object.freeze({
    "Avg. Clustering Co.": NetworkStatisticAlgorithms.avgClusteringCoefficient,
    "Avg. Path Length": NetworkStatisticAlgorithms.avgPathLength,
    "Graph Density": NetworkStatisticAlgorithms.graphDensity,
    "Network Diameter": NetworkStatisticAlgorithms.networkDiameter,
    "Connected Components": NetworkStatisticAlgorithms.connectedComponents,
    "Avg. Degree": NetworkStatisticAlgorithms.avgDegree
});

function NetworkStatistics() {
    return (
        <div className={styles.detailsWrapper}>
            <h2 className="sidebarSubTitle" style={{ marginTop: "15px" }}>
                Network Statistics
            </h2>
            <RunAlgorithms 
                algorithms={networkStatistics} 
                isNetworkStatistic={true}
            />
        </div>
    )
}

export default NetworkStatistics;