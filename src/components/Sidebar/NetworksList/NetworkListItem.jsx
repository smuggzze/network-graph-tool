import styles from "./NetworksList.module.css";

function NetworkListItem({ networkName }) {
    function removeNetwork() {

    }

    return (
        <div className={styles.listItem}>
            <p>{networkName}</p>
            <button className={`btn ${styles.removeBtn}`} onClick={removeNetwork}>
                Remove
            </button>
        </div>
    )
}

export default NetworkListItem;