import styles from "./DetailsSidebar.module.css";
import GraphDetails from "./GraphDetails/GraphDetails";
import NetworkStatistics from "./NetworkStatistics/NetworkStatistics";
import SelectedNode from "./SelectedNode/SelectedNode";

function DetailsSidebar({ canvasOffset, setCanvasOffset, selectedNode, updateSelectedNode, resetGraph }) {
    // Toggles the details sidebar on and off to improve
    // screen space for graph visualisation.
    function toggleDetails() {
        setCanvasOffset((cur) => {
            // If the details sidebar is open, close it.
            if (cur == 720) return 390;
            else return 720;
        });
    }

    return (
        <div className={`sidebar ${styles.detailsSidebar}`} style={canvasOffset != 720 ? { minWidth: '30px' } : {}}>
            <button className={`sideText ${styles.toggleSidebarButton}`} onClick={toggleDetails}>
                {canvasOffset == 720 ? ">>" : "<<"}
            </button>
            {canvasOffset == 720 &&
            <div style={{ overflowY: "scroll", height: "100%" }}>
                <GraphDetails />
                <NetworkStatistics />
                {selectedNode && 
                <SelectedNode 
                    selectedNode={selectedNode} 
                    updateSelectedNode={updateSelectedNode}
                    resetGraph={resetGraph} 
                />}
            </div>}
        </div>
    )
}

export default DetailsSidebar;