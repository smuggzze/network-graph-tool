import styles from "./SelectedNode.module.css";

function NodeInfo({ label, value }) {
    return (
        <div className={styles.nodeInfo}>
            <div className={styles.labelBox}>
                <p className="sideText">{label}</p>
            </div>
            <div className={styles.valueBox}>
                <p style={{ wordBreak: "break-all" }}>{value}</p>
            </div>
        </div>
    )
}

export default NodeInfo;