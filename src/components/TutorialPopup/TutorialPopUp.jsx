import { useState } from "react";
import PopUpWrapper from "../../wrappers/PopUpWrapper";
import styles from "./TutorialPopUp.module.css";
import { tutorialData } from "../../utils/tutorialData";

function TutorialPopUp({ toggleTutorial }) {
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
        <PopUpWrapper>
            <div className={styles["tutorial-popup"]}>
                <button className={styles["tutorial-popup-exit-btn"]} onClick={toggleTutorial}>X</button>
                <h1 className={styles["tutorial-popup-title"]}>{tutorialData[currentPage].title}</h1>
                <div className={styles["tutorial-popup-video-container"]}>
                    <iframe className={styles["tutorial-popup-video"]}
                        src={tutorialData[currentPage].videoLink}
                        title="Tutorial Video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className={styles["tutorial-popup-text-container"]}>
                    <p className={styles["tutorial-popup-text"]}>
                        {tutorialData[currentPage].text}
                    </p>
                </div>
                <button className={styles["tutorial-popup-back-btn"]} onClick={handleBack}>
                    back
                </button>
                <button className={styles["tutorial-popup-fwd-btn"]} onClick={handleForward}>
                    Forward
                </button>
            </div>
        </PopUpWrapper>
    );
}

export default TutorialPopUp;