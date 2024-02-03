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

function Sidebar({ networkNames, setAddNetworkPopUp, setTutorialPopUp }) {
    return (
        <div className={`sidebar ${styles.leftSidebar}`}>
            <div>
                <div className={styles.titleContianer}>
                    <h1 className={styles.title}>
                        EZ Graph
                    </h1>
                    <button className="primaryBtn" onClick={() => setTutorialPopUp((cur) => !cur)}>
                        Tutorial
                    </button>
                </div>
                <NetworksList 
                    networkNames={networkNames} 
                    setAddNetworkPopUp={setAddNetworkPopUp}
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