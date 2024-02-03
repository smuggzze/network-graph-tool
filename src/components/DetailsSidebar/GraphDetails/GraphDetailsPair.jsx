import styles from "./GraphDetails.module.css";

function GraphDetailsPair({ label, value }) {
    return (
        <div className={styles.graphDetailsPair}>
            <p className="sideText">{label}</p>
            <p>{value}</p>
        </div>
    )
}

export default GraphDetailsPair;