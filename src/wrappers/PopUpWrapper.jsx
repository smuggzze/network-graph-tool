
function PopUpWrapper({ children, setPopUp }) {
    function closePopUp() {
        setPopUp(false);
    }

    return (
        <div className="popUpWrapper">
            <div className="popUp">
                <button className="exitBtn" onClick={closePopUp}>X</button>
                {children}
            </div>
        </div>
    )
}

export default PopUpWrapper;