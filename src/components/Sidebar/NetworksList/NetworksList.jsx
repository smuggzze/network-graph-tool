import NetworkListItem from "./NetworkListItem";
import styles from "./NetworksList.module.css";

function NetworksList() {
    return (
        <div>
            <NetworkListItem />
            <NetworkListItem />
            <p className={styles.addNetwork}>
                + Add a network
            </p>
        </div>
    )
}

export default NetworksList;