import styles from "./Sidebar.module.css";
import NetworksList from "./NetworksList/NetworksList";
import NetworkComparisons from "./NetworkComparisons/NetworkComparisons";
import Colours from "./Colours/Colours";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div>
                <h1 className={styles.title}>EZ Graph</h1>
                <p className={styles.subTitle}>Networks (max 2)</p>
                <NetworksList />
                <p className={styles.subTitle}>Compare Networks</p>
                <NetworkComparisons />
            </div>
            <div>
                <p className={styles.subTitle}>Colours</p>
                <Colours />
            </div>
        </div>
    )
}

export default Sidebar;