import styles from "./Run.module.css";

function Run({ label, runAlgorithm, data }) {
    return (
        <div className={styles.run}>
            <p className="sideText">
                {label}
            </p>
            <div className={styles.runResultWrapper}>
                {data != null && <p>{data}</p>}
                <button className={`${styles.runButton} primaryBtn`} onClick={runAlgorithm}>
                    Run
                </button>
            </div>
        </div>
    )
}

export default Run;