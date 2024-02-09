import styles from "./Sidebar.module.css";
import NetworksList from "./NetworksList/NetworksList";
import Colours from "./Colours/Colours";
import CompareNetworks from "./CompareNetworks/CompareNetworks";

function Sidebar({ networkNames, setAddNetworkPopUp, setTutorialPopUp }) {
    return (
        <div className={`sidebar ${styles.leftSidebar}`}>
            <div>
                <div className={styles.titleContianer}>
                    <h1 className={styles.title}>
                        EZ Graph
                    </h1>
                    <button className={`${styles.tutorialBtn} primaryBtn`} onClick={() => setTutorialPopUp((cur) => !cur)}>
                        Tutorial
                    </button>
                </div>
                <NetworksList 
                    networkNames={networkNames} 
                    setAddNetworkPopUp={setAddNetworkPopUp}
                />
                <CompareNetworks />
            </div>
            <Colours />
        </div>
    )
}

export default Sidebar;