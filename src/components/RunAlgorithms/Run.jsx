import styles from "./RunAlgorithms.module.css";

function Run({ label }) {
    return (
        <div className={styles.runAlgorithm}>
            <p className={`side-text`}>
                {label}
            </p>
            <button className={`${styles.runButton} primary-btn`}>
                Run
            </button>
        </div>
    )
}

export default Run;