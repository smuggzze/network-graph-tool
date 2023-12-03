import styles from "./Sidebar.module.css";
import NetworksList from "./NetworksList/NetworksList";
import RunAlgorithms from "../RunAlgorithms/RunAlgorithms";
import Colours from "./Colours/Colours";

const comparisonMethods = Object.freeze({
    "Degree Centrality": null,
    "Betweenness Centrality": null,
    "Closeness Centrality": null,
    "Eigenvector Centrality": null,
    "Common Node ID's": null, 
    "Jaccard Similarity": null,
    "Strongly Connected Components": null
});

function Sidebar() {
    return (
        <div className={`sidebar ${styles.leftSidebar}`}>
            <div>
                <h1 className={styles.title}>
                    EZ Graph
                </h1>
                <h2 className="sidebarSubTitle">
                    Networks (max 2)
                </h2>
                <NetworksList />
                <h2 className="sidebarSubTitle">
                    Compare networks
                </h2>
                <RunAlgorithms algorithms={comparisonMethods} />
            </div>
            <div>
                <h2 className="sidebarSubTitle">
                    Colours
                </h2>
                <Colours />
            </div>
        </div>
    )
}

export default Sidebar;