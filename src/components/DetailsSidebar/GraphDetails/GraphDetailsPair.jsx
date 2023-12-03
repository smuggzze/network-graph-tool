import styles from "./GraphDetails.module.css";

function GraphDetailsPair({ label, value }) {
    return (
        <div className={styles.graphDetailsPair}>
            <p className="side-text">{label}</p>
            <p>{value}</p>
        </div>
    )
}

export default GraphDetailsPair;