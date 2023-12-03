import Run from "./Run";
import styles from "./RunAlgorithms.module.css";

function RunAlgorithms({ algorithms }) {
    return (
        <div className={styles.algorithms}>
            {Object.keys(algorithms).map((method, index) => {
                return (
                    <Run 
                        label={method} 
                        key={index} 
                    />
                )
            })}
        </div>
    )
}

export default RunAlgorithms;