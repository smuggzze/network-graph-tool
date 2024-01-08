import styles from "./Sidebar.module.css";
import NetworksList from "./NetworksList/NetworksList";
import RunAlgorithms from "../RunAlgorithms/RunAlgorithms";
import Colours from "./Colours/Colours";

// Object that is used by the UI to run the associated network comparison algorithm when the
// 'run' button is clicked by the user.
const comparisonMethods = Object.freeze({
    "Degree Centrality": () => {},
    "Betweenness Centrality": () => {},
    "Closeness Centrality": () => {},
    "Eigenvector Centrality": () => {},
    "Common Node ID's": () => {}, 
    "Jaccard Similarity": () => {},
    "Strongly Connected Components": () => {}
});

function Sidebar({ networkNames, toggleNetworkPopUp, toggleTutorial }) {
    return (
        <div className={`sidebar ${styles.leftSidebar}`}>
            <div>
                <div className={styles["title-contianer"]}>
                    <h1 className={styles.title}>
                        EZ Graph
                    </h1>
                    <button className="primary-btn" onClick={toggleTutorial}>
                        Tutorial
                    </button>
                </div>
                <NetworksList 
                    networkNames={networkNames} 
                    toggleNetworkPopUp={toggleNetworkPopUp}
                />
                <h2 className="sidebarSubTitle">
                    Compare
                </h2>
                <RunAlgorithms algorithms={comparisonMethods} />
            </div>
            <Colours />
        </div>
    )
}

export default Sidebar;