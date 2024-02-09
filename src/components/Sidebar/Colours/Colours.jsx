import styles from "./Colours.module.css";
import { graphColours } from "../../../utils/graphColours";
import { useState } from "react";

function Colours() {
    const [option, setOption] = useState("Centrality");
    
    return (
        <div>
            <h2 className="sidebarSubTitle">
                Colours
            </h2>
            <select className={styles.dropdown} onChange={(e) => setOption(e.target.value)}>
                {Object.keys(graphColours).map((method, index) => {
                    return (
                        <option key={index}>
                            {method}
                        </option>
                    )
                })}
            </select>
            <div className={styles.dropdownWrapper}>
                {Object.keys(graphColours[option]).map((key) => {
                    return (
                        <div key={key} className={`sideText ${styles.dropdownOption}`}>
                            {key}
                            <span className={styles.colourCircle} style={{ backgroundColor: graphColours[option][key].fillStyle }}>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Colours;