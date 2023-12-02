import RunComparison from "./RunComparison";
import styles from "./NetworkComparisons.module.css";

const comparisonMethods = [
    "Degree Centrality", "Betweenness Centrality", "Closeness Centrality",
    "Eigenvector Centrality", "Common Node ID's", "Jaccard Similarity",
    "Strongly Connected Components"
];

function NetworkComparisons() {
    return (
        <div className={styles.networkComparisons}>
            {comparisonMethods.map((method, index) => {
                return (
                    <RunComparison 
                        label={method} 
                        key={index} 
                    />
                )
            })}
        </div>
    )
}

export default NetworkComparisons;