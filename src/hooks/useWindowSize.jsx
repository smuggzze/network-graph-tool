import { useState, useEffect } from "react";

function useWindowSize() {
    const [windowSize, setWindowSize] = useState(document.body.clientWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(document.body.clientWidth);
        };

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return windowSize;
}

export default useWindowSize;