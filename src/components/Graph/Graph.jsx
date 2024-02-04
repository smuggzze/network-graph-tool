import ForceGraph2D from 'react-force-graph-2d';
import styles from "./Graph.module.css";
import { useRef } from "react";

function Graph({ graph, isLastGraph, width, selectedNode, setSelectedNode }) {
    const graphRef = useRef(null);

    function handleNodeClick(node) {
        setSelectedNode(node);
    }

    function handleNodeDrag(node) {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
    }

    function handleDrawNode(node, ctx, globalScale) {
        const label = node.id;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
        ctx.fillStyle = selectedNode === node ? '#22BEC8' : 'white';
        ctx.fill();
        ctx.strokeStyle = '#22BEC8'; // Node border color
        ctx.lineWidth = 1 / globalScale;
        ctx.stroke();

        // Draw label
        ctx.font = `${node.size / 1.3}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = selectedNode === node ? 'white' : '#121212'; // Label color
        ctx.fillText(label, node.x, node.y);
        ctx.isPointInPath(node.x, node.y);
    }

    return (
        <div className={styles.wrapper} data-testid="graph-1" style={!isLastGraph ? { borderRight: '1px solid #C5C5C5' } : {}}>
            <div className={styles.graphOptions}>
                <button className={`${styles.resetGraph} primaryBtn`}>
                    Reset graph
                </button>
            </div>
            <ForceGraph2D
                width={width}
                ref={graphRef}
                linkWidth={2}
                linkDirectionalArrowLength={graph.isDirected ? 5 : null}
                nodeCanvasObject={handleDrawNode}
                linkCurvature={0.20}
                onNodeDragEnd={handleNodeDrag}
                onNodeClick={handleNodeClick}
                graphData={{
                    nodes: graph.nodes,
                    links: graph.links
                }}
            />
        </div>
    )
}

export default Graph;