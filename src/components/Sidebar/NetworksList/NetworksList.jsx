import NetworkListItem from "./NetworkListItem";
import styles from "./NetworksList.module.css";
import AddNetwork from "../../AddNetwork/AddNetwork";
import { useState } from "react";

function NetworksList({ networkNames }) {
    const [addNetworkPopUp, setAddNetworkPopUp] = useState(false);

    function openNetworkPopUp() {
        setAddNetworkPopUp(true);
    }

    return (
        <>
            {addNetworkPopUp && <AddNetwork />}
            <h2 className="sidebarSubTitle">
                Networks (max 2)
            </h2>
            {networkNames.map((name, index) => {
                return (
                    <NetworkListItem
                        networkName={name}
                        key={index}
                    />
                )
            })}
            <p className={styles.addNetwork} onClick={openNetworkPopUp}>
                + Add a network
            </p>
        </>
    )
}

export default NetworksList;