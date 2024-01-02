import styles from "./DetailsSidebar.module.css";
import GraphDetails from "./GraphDetails/GraphDetails";
import NetworkStatistics from "./NetworkStatistics/NetworkStatistics";
import SelectedNode from "./SelectedNode/SelectedNode";

function DetailsSidebar({ canvasOffset, setCanvasOffset }) {
    function toggleDetails() {
        setCanvasOffset((cur) => {
            if (cur == 700) return 380;
            else return 700;
        });
    }

    return (
        <div className={`sidebar ${styles.detailsSidebar}`} style={canvasOffset != 700 ? { minWidth: '30px' } : {}}>
            {/* <button className={`side-text ${styles.toggleSidebarButton}`} onClick={toggleDetails}>
                {canvasOffset == 700 ? ">>" : "<<"}
            </button> */}
            {canvasOffset == 700 &&
            <>
                <GraphDetails />
                <NetworkStatistics />
                <SelectedNode />
            </>}
        </div>
    )
}

export default DetailsSidebar;