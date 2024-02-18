import styles from "./Run.module.css";
import MoreInfo from "../MoreInfo/MoreInfo";

function Run({ label, moreInfo, runAlgorithm, data }) {
    return (
        <div className={styles.run}>
            <div className={styles.moreInfoWrapper}>
                {moreInfo && <MoreInfo text={moreInfo} size={20} />}
                <p className="sideText">
                    {label}
                </p>
            </div>
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