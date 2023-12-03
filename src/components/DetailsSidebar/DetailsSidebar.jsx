import styles from "./DetailsSidebar.module.css";
import GraphDetails from "./GraphDetails/GraphDetails";
import NetworkStatistics from "./NetworkStatistics/NetworkStatistics";
import SelectedNode from "./SelectedNode/SelectedNode";

function DetailsSidebar() {
    return (
        <div className={`sidebar ${styles.detailsSidebar}`}>
            <button className={`side-text ${styles.toggleSidebarButton}`}>
                {'>>'}
            </button>
            <GraphDetails />
            <NetworkStatistics />
            <SelectedNode />
        </div>
    )
}

export default DetailsSidebar;