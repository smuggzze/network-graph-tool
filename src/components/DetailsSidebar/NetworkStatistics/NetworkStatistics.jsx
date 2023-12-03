import RunAlgorithms from "../../RunAlgorithms/RunAlgorithms";
import styles from "../DetailsSidebar.module.css";

const networkStatistics = Object.freeze({
    "Avg. Clustering Coefficient": null,
    "Avg. Path Length": null,
    "Graph Density": null,
    "Network Diameter": null,
    "Connected Components": null,
    "Avg. Degree": null
});

function NetworkStatistics() {
    return (
        <div className={styles.detailsWrapper}>
            <h2 className="sidebarSubTitle" style={{ marginTop: "15px" }}>
                Network statistics
            </h2>
            <RunAlgorithms algorithms={networkStatistics} />
        </div>
    )
}

export default NetworkStatistics;