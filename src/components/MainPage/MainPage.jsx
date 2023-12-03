import Graph from "../Graph/Graph";
import styles from "./MainPage.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DetailsSidebar from "../DetailsSidebar/DetailsSidebar";

function MainPage() {
    return (
        <div className={styles.mainPage}>
            <Sidebar />
            <Graph />
            <DetailsSidebar />
        </div>
    )
}

export default MainPage;