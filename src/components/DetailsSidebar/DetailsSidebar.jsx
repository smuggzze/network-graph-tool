import styles from "./DetailsSidebar.module.css";
import GraphDetails from "./GraphDetails/GraphDetails";
import NetworkStatistics from "./NetworkStatistics/NetworkStatistics";
import SelectedNode from "./SelectedNode/SelectedNode";

function DetailsSidebar({ canvasOffset, setCanvasOffset, selectedNode }) {
    // Toggles the details sidebar on and off to improve
    // screen space for graph visualisation.
    function toggleDetails() {
        setCanvasOffset((cur) => {
            // If the details sidebar is open, close it.
            if (cur == 700) return 380;
            else return 700;
        });
    }

    return (
        <div className={`sidebar ${styles.detailsSidebar}`} style={canvasOffset != 700 ? { minWidth: '30px' } : {}}>
            <button className={`sideText ${styles.toggleSidebarButton}`} onClick={toggleDetails}>
                {canvasOffset == 700 ? ">>" : "<<"}
            </button>
            {canvasOffset == 700 &&
            <>
                <GraphDetails />
                <NetworkStatistics />
                {selectedNode && <SelectedNode selectedNode={selectedNode} />}
            </>}
        </div>
    )
}

export default DetailsSidebar;