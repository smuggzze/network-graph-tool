import styles from "./NetworkComparisons.module.css";

function RunComparison({ label }) {
    return (
        <div className={styles.runComparison}>
            <p className={styles.comparisonText}>
                {label}
            </p>
            <button className={styles.runButton}>
                Run
            </button>
        </div>
    )
}

export default RunComparison;