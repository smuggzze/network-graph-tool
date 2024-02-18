import { useState } from "react";
import styles from "./MoreInfo.module.css";
import OutsideClickHandler from "react-outside-click-handler";

function MoreInfo({ text, size }) {
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    function toggleShowMoreInfo() {
        setShowMoreInfo((cur) => !cur);
    }

    return (
        <div className={styles.moreInfo} style={{ height: `${size}px` }}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" 
            width={`${size}px`} height={`${size}px`} onClick={toggleShowMoreInfo} style={{ cursor: "pointer", borderRadius: "100%" }}>
                <g fill="#757575" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" 
                strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" 
                textAnchor="none" style={{ mixBlendMode: "normal" }}>
                    <g transform="scale(8.53333,8.53333)">
                        <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM16,21h-2v-7h2zM15,11.5c-0.828,0 -1.5,-0.672 -1.5,-1.5c0,-0.828 0.672,-1.5 1.5,-1.5c0.828,0 1.5,0.672 1.5,1.5c0,0.828 -0.672,1.5 -1.5,1.5z">
                        </path>
                    </g>
                </g>
            </svg>
            {showMoreInfo &&
            <OutsideClickHandler onOutsideClick={toggleShowMoreInfo}>
                <div className={styles.moreInfoPopUp}>
                    <p className="sideText">{text}</p>
                </div>
            </OutsideClickHandler>}
        </div>
    )
}

export default MoreInfo;