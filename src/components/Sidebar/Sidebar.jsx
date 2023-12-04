import styles from "./Sidebar.module.css";
import NetworksList from "./NetworksList/NetworksList";
import RunAlgorithms from "../RunAlgorithms/RunAlgorithms";
import Colours from "./Colours/Colours";

const comparisonMethods = Object.freeze({
    "Degree Centrality": () => {},
    "Betweenness Centrality": () => {},
    "Closeness Centrality": () => {},
    "Eigenvector Centrality": () => {},
    "Common Node ID's": () => {}, 
    "Jaccard Similarity": () => {},
    "Strongly Connected Components": () => {}
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