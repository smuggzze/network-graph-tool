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

function Sidebar({ networkNames, toggleNetworkPopUp, setTutorialPopUp, toggleTutorial}) {
    const handleToggle = () => {
        setTutorialPopUp(true);
        toggleTutorial;
    };

    return (
        <div className={`sidebar ${styles.leftSidebar}`}>
            <div>
                <div className={styles["title-contianer"]}>
                    <h1 className={styles.title}>
                    EZ Graph
                    

                    </h1>
                    <button className={styles["open-tutorial"]} onClick={handleToggle} > Tutorial </button>
                </div>
                
                <NetworksList 
                    networkNames={networkNames} 
                    toggleNetworkPopUp={toggleNetworkPopUp}
                />
                <h2 className="sidebarSubTitle">
                    Compare networks
                </h2>
                <RunAlgorithms algorithms={comparisonMethods} />
            </div>
            <Colours />
            
        </div>
    )
}

export default Sidebar;