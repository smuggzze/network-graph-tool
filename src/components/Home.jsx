import Graph from "./Graph/Graph";
import styles from "./Home.module.css";
import Sidebar from "./Sidebar/Sidebar";
import DetailsSidebar from "./DetailsSidebar/DetailsSidebar";

function Home() {
    return (
        <div className={styles.mainPage}>
            <Sidebar />
            <Graph />
            <DetailsSidebar />
        </div>
    )
}

export default Home;