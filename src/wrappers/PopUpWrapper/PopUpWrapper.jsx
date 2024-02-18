import styles from "./PopUpWrapper.module.css";
import OutsideClickHandler from "react-outside-click-handler";
import CloseSvg from "../../components/CloseSvg";

function PopUpWrapper({ children, setPopUp, title }) {
    function closePopUp() {
        setPopUp(false);
    }

    return (
        <div className="popUpWrapper">
            <OutsideClickHandler onOutsideClick={closePopUp}>
                <div className="popUp">
                    <div className={styles.exitWrapper}>
                        <CloseSvg
                            size={25}
                            colour={"black"}
                            action={closePopUp}
                        />
                    </div>
                    <h1 className={styles.title}>{title}</h1>
                    {children}
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default PopUpWrapper;