import styles from "../DetailsSidebar.module.css";
import NodeInfo from "./NodeInfo";

function SelectedNode() {
    return (
        <div className={styles.detailsWrapper} style={{ borderBottom: "none" }}>
            <h2 className="sidebarSubTitle" style={{ marginTop: "15px" }}>
                Selected Node
            </h2>
            <NodeInfo label="Node ID" value={4} />
            <NodeInfo label="Neighbours" value={"{6}"} />
            <NodeInfo label="Out-degree" value={1} />
            <NodeInfo label="In-degree" value={1} />
            <NodeInfo label="Clustering Coefficient" value={0.45} />
        </div>
    )
}

export default SelectedNode;