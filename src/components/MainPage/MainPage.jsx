import Graph from "../Graph/Graph";
import styles from "./MainPage.module.css";
import Sidebar from "../Sidebar/Sidebar";
import GraphDetails from "../GraphDetails/GraphDetails";

function MainPage() {
    return (
        <div className={styles.mainPage}>
            <Sidebar />
            <Graph />
            <GraphDetails />
        </div>
    )
}

export default MainPage;