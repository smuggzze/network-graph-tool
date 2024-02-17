import styles from "./PopUpWrapper.module.css";
import OutsideClickHandler from "react-outside-click-handler";

function PopUpWrapper({ children, setPopUp, title }) {
    function closePopUp() {
        setPopUp(false);
    }

    return (
        <div className="popUpWrapper">
            <OutsideClickHandler onOutsideClick={closePopUp}>
                <div className="popUp">
                    <button className={styles.exitBtn} onClick={closePopUp}>X</button>
                    <h1 className={styles.title}>{title}</h1>
                    {children}
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default PopUpWrapper;