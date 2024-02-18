import styles from "./ErrorPopUp.module.css";
import CloseSvg from "../CloseSvg";
import { useCallback, useEffect } from "react";

function ErrorPopUp({ errorMessage, setErrorMessage }) {
    const closeError = useCallback(() => {
        if (errorMessage !== "") {
            setErrorMessage("");
        }
    }, [setErrorMessage, errorMessage]);

    useEffect(() => {
        setTimeout(() => {
            closeError();
        }, 6000);
    }, [closeError]);

    return (
        <div className={styles.error}>
            <p className={styles.errorMessage}>{errorMessage}</p>
            <CloseSvg
                size={22}
                colour="white"
                action={closeError}
            />
        </div>
    )
}

export default ErrorPopUp;