import { useState } from "react";
import PopUpWrapper from "../../wrappers/PopUpWrapper";
import { tutorialData } from "../../utils/tutorialData";

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
        <PopUpWrapper setPopUp={setTutorialPopUp}>
            <h1>{tutorialData[currentPage].title}</h1>
            <div>
                <iframe
                    src={tutorialData[currentPage].videoLink}
                    title="Tutorial Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            </div>
            <div>
                <p>
                    {tutorialData[currentPage].text}
                </p>
            </div>
            <button className={`primaryBtn`} onClick={handleBack}>
                back
            </button>
            <button className={`primaryBtn`} onClick={handleForward}>
                Forward
            </button>
        </PopUpWrapper>
    );
}

export default TutorialPopUp;