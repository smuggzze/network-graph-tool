import styles from "../DetailsSidebar.module.css";

function SelectedNode() {
    return (
        <div className={styles.detailsWrapper}>
            <h2 className="sidebarSubTitle" style={{ marginTop: "15px" }}>
                Selected Node
            </h2>
        </div>
    )
}

export default SelectedNode;