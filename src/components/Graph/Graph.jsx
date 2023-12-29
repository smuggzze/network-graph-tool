import ForceGraph2D from 'react-force-graph-2d';
import styles from "./Graph.module.css";

function Graph({ graph, isLastGraph, width }) {
    return (
        <div className={styles.wrapper} data-testid="graph-1" style={!isLastGraph ? { borderRight: '1px solid #C5C5C5' } : {}}>
            <div className={styles.graphOptions}>
                <button className={`${styles.resetGraph} primary-btn`}>
                    Reset graph
                </button>
                <p className={`side-text ${styles.networkName}`}>
                    {graph.networkName}
                </p>
            </div>
            <ForceGraph2D
                width={width}
                linkWidth={2}
                linkDirectionalArrowLength={graph.isDirected ? 5 : null}
                linkCurvature={graph.isDirected ? 0.25 : null}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.id;

                    // Draw node
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white'; // Node fill color
                    ctx.fill();
                    ctx.strokeStyle = '#22BEC8'; // Node border color
                    ctx.lineWidth = 1 / globalScale;
                    ctx.stroke();
            
                    // Draw label
                    ctx.font = `${node.size / 1.3}px Sans-Serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#121212'; // Label color
                    ctx.fillText(label, node.x, node.y);
                }}
                graphData={{
                    nodes: graph.nodes,
                    links: graph.links
                }} 
            />
        </div>
    )
}

export default Graph;