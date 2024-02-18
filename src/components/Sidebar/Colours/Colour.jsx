import styles from "./Colours.module.css";

function Colour({ text, colour }) {
    return (
        <div className={`sideText ${styles.dropdownOption}`}>
            {text}
            <span className={styles.colourCircle} style={{ backgroundColor: colour }}>
            </span>
        </div>
    )
}

export default Colour;