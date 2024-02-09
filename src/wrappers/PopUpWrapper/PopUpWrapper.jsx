import styles from "./PopUpWrapper.module.css";

function PopUpWrapper({ children, setPopUp, title }) {
    function closePopUp() {
        setPopUp(false);
    }

    return (
        <div className="popUpWrapper">
            <div className="popUp">
                <button className={styles.exitBtn} onClick={closePopUp}>X</button>
                <h1 className={styles.title}>{title}</h1>
                {children}
            </div>
        </div>
    )
}

export default PopUpWrapper;