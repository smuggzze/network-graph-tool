import styles from "../DetailsSidebar.module.css";
import GraphDetailsPair from "./GraphDetailsPair";

function GraphDetails() {
    return (
        <div className={styles.detailsWrapper} style={{ marginTop: "76px" }}>
            <h2 className="sidebarSubTitle">
                Graph details
            </h2>
            <div className={styles.detailPairs}>
                <GraphDetailsPair label="Nodes" value={7} />
                <GraphDetailsPair label="Edges" value={6} />
                <GraphDetailsPair label="Graph Type" value="Undirected" />
            </div>
        </div>
    )
}

export default GraphDetails;