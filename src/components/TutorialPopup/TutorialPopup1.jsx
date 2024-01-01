import React, {useState} from "react";
import PopUpWrapper from "../../wrappers/PopUpWrapper";
import styles from "./TutorialPopup.module.css";

export default function TutorialPopup1({setTutorialPopUp ,toggleTutorial }) {

    const handleClose = () => {
        setTutorialPopUp(false);
        toggleTutorial; // Pass the updated state to the onClose function in Main component
    };

    const [currentPage, setCurrentPage] = useState(0);

    const handleBack = () => {
       
        if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
          console.log(currentPage);
        }
      }
    
      const handleForward = () => {

        if (currentPage < tutorialData.length - 1) {
          setCurrentPage(currentPage + 1);
          console.log(currentPage);
        }
        }

        
    const tutorialData = [
            {
                title: "Welcome to the tutorial!",
                videoLink: "https://www.youtube.com/embed?v=102_iWHTvfY",
                text: "In this tutorial, we will show you how to use the application. \
                This includes how to add a network, visualise it, and interact with the visualisation.\
                You can navigate through the tutorial using the back and forward buttons below.\
                You can also exit the tutorial at any time by clicking the X button in the top right corner.",
            },
            {
                title: "How to add a network",
                videoLink: "https://www.youtube.com/embed?v=102_iWHTvfY",
                text: "Click the 'Add Network' button in the sidebar. or the 'Add Network' button on the graph space.\
                This will open a pop-up window where you can enter the name of the network you want to add.\
                you will also be required to supply a file containing the data for the network.\
                after clicking the create graph button, the network will be added to the sidebar and visualised",
            },
            {
                title: "How to add another network",
                videoLink: "https://www.youtube.com/embed?v=102_iWHTvfY",
                text: "the top left of the network sidebar contains a button labelled 'Add Network'.\
                Clicking this button will open the same pop-up window as before, following the previous steps will add another network",
            },
            {
                title: "How to use the algorithms to compare networks",
                videoLink: "https://www.youtube.com/embed?v=102_iWHTvfY",
                text: "The sidebar contains a list of algorithms, clicking on one of these will run the selected algorithm on the currently selected networks.\
                The results of the algorithm will be displayed in the details sidebar.",
            },
            {
                title: "How to understand the colour coding of the nodes",
                videoLink: "https://www.youtube.com/embed?v=102_iWHTvfY",
                text: "The nodes in the visualisation are coloured based on their relative importance.\
                red nodes are of high importance, while orange nodes are of medium importance, and green nodes are of low importance.\
                to change the colours from centrality to another metric, use the drop down menu in the details sidebar under the colours section.",
            },
            {
                title: "How to understand the details sidebar",
                videoLink: "https://www.youtube.com/embed?v=102_iWHTvfY",
                text: "This sidebar contains information about the currently selected networks.\
                This includes the name of the network, the number of nodes and edges, and the average degree of the nodes.\
                It also contains a list of the nodes in the network, and their centrality scores.\
                The sidebar also contains the information gathered from the algorithms.\
                When comparing two networks, the difference between the two networks is also displayed.",
            },
    ];

    const pageData = tutorialData[currentPage];

    return (
        <PopUpWrapper>
            <div className={styles["tutorial-popup"]}>
                <button className={styles["tutorial-popup-exit-btn"]} onClick={handleClose}>X</button>
                <h1 className={styles["tutorial-popup-title"]}>{pageData.title}</h1>
                
                <div className={styles["tutorial-popup-video-container"]}>
                    <iframe className={styles["tutorial-popup-video"]}
                        src={pageData.videoLink}
                        title="Tutorial Video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                    
                </div>
                <div className={styles["tutorial-popup-text-container"]}>
                    <p className={styles["tutorial-popup-text"]}>
                        {pageData.text}
                        
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


