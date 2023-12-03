import ForceGraph2D from 'react-force-graph-2d';
import styles from "./Graph.module.css";
import useWindowSize from '../../hooks/useWindowSize';

function Graph() {
    const windowSize = useWindowSize();

    return (
        <div className={styles.wrapper}>
            <div className={styles.graphOptions}>
                <button className={`${styles.resetGraph} primary-btn`}>
                    Reset graph
                </button>
                <p className={`side-text ${styles.networkName}`}>
                    Example network 1
                </p>
            </div>
            <ForceGraph2D
                width={windowSize - 700}
                graphData={{
                    nodes: [{ id: 1 }, { id : 2 }, { id: 3 }],
                    links: [{ source: 1, target: 3 }, { source: 2, target: 1 }]
                }} 
            />
        </div>
    )
}

export default Graph;