import Run from "./Run";
import styles from "./RunAlgorithms.module.css";

function RunAlgorithms({ algorithms, isNetworkStatistic }) {
    return (
        <div className={styles.algorithms}>
            {Object.keys(algorithms).map((method, index) => {
                return (
                    <Run 
                        label={method}
                        algorithm={algorithms[method]}
                        isNetworkStatistic={isNetworkStatistic}
                        key={index} 
                    />
                )
            })}
        </div>
    )
}

export default RunAlgorithms;