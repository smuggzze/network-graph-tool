import { useState } from "react";
import PopUpWrapper from "../../wrappers/PopUpWrapper/PopUpWrapper";
import { tutorialData } from "../../utils/tutorialData";
import styles from "./TutorialPopup.module.css";

function TutorialPopUp({ setTutorialPopUp }) {
    const [currentPage, setCurrentPage] = useState(0);

    // Sets the current page back to the previous page in the tutorial.
    function handleBack() {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    
    // Sets the current page to the next page in the tutorial.
    function handleForward() {
        if (currentPage < tutorialData.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <PopUpWrapper setPopUp={setTutorialPopUp} title={tutorialData[currentPage].title}>
            <div>
                <iframe
                    src={tutorialData[currentPage].videoLink}
                    className={styles.videoLink}
                    title="Tutorial Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            </div>
            <p className={styles.description}>{tutorialData[currentPage].text}</p>
            <div className={styles.btnWrapper}>
                <button className={`${styles.btn} primaryBtn`} onClick={handleBack}>
                    Back
                </button>
                <button className={`${styles.btn} primaryBtn`} onClick={handleForward}>
                    Forward
                </button>
            </div>
        </PopUpWrapper>
    );
}

export default TutorialPopUp;