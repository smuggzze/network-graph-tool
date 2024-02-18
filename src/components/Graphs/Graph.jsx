import ForceGraph2D from 'react-force-graph-2d';
import styles from "./Graphs.module.css";
import { GraphContext } from '../Main/Main';
import { useRef, useContext, useState, memo, useEffect } from "react";
import { updateGraphLocalStorage } from '../../utils/updateGraphLocalStorage';

const dagModes = Object.freeze({
    "Top-Down": "td",
    "Bottom-Up": "bu",
    "Left-Right": "lr",
    "Right-Left": "rl",
    "Radial-In": "radialin",
    "Radial-Out": "radialout",
    "None": null
});

export default memo(function Graph({ graph, resetGraph, isLastGraph, width, height, selectedNode, updateSelectedNode }) {
    const [dagMode, setDagMode] = useState(graph.dagMode);
    const [linkParticles, setLinkParticles] = useState(graph.showParticles);
    const [zoomToFit, setZoomToFit] = useState(graph.zoomToFit);
    const graphContext = useContext(GraphContext);
    const graphRef = useRef(null);

    function handleNodeClick(node) {
        graphContext.setSelectedGraph(graph);
        updateSelectedNode(node);
    }

    function downloadGraph() {
        const graphData = {
            ...graph,
            links: graph.links.map((x) => { return { source: x.source.id, target: x.target.id }}),
            nodes: graph.nodes.map((node) => { return { id: node.id }}),
        };

        const jsonData = JSON.stringify(graphData);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create a hidden anchor element
        const anchor = document.createElement('a');
        anchor.download = 'graph.json'; // Set the filename for the downloaded JSON file
        anchor.href = url;

        // Programmatically click the anchor to trigger download
        anchor.click();

        // Clean up
        URL.revokeObjectURL(url);
    }

    function updateDagMode(e) {
        const mode = e.target.value;
        updateGraphLocalStorage({ dagMode: mode }, graph.networkName);
        setDagMode(mode);
    }

    function toggleLinkParticles(e) {
        const checked = e.target.checked;
        updateGraphLocalStorage({ showParticles: checked }, graph.networkName);
        setLinkParticles(checked);
    }

    function toggleZoomToFit(e) {
        const checked = e.target.checked;
        updateGraphLocalStorage({ zoomToFit: checked }, graph.networkName);
        setZoomToFit(checked);
    }

    function handleDrawNode(node, ctx, globalScale) {
        const label = node.id;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, graph.styles[node.id].size, 0, 2 * Math.PI);
        ctx.fillStyle = selectedNode === node ? '#e43131' : graph.styles[node.id].fillStyle;
        ctx.fill();
        ctx.strokeStyle = selectedNode === node ? '#e43131' : graph.styles[node.id].strokeStyle; // Node border color
        ctx.lineWidth = 1 / globalScale;
        ctx.stroke();

        // Draw label
        ctx.font = `${graph.styles[node.id].size / 1.3}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = selectedNode === node ? 'white' : graph.styles[node.id].textStyle; // Label color
        ctx.fillText(label, node.x, node.y);
        ctx.isPointInPath(node.x, node.y);
    }

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force('charge').distanceMax(300);
        }
    }, [graphRef]);

    return (
        <div className={styles.wrapper} style={!isLastGraph ? { borderRight: '1px solid #C5C5C5' } : {}}>
            <div className={styles.graphOptions}>
                <div className={styles.btnActions}>
                    <button className={`${styles.btnAction} primaryBtn`} onClick={() => resetGraph(graph)}>
                        Reset
                    </button>
                    <button className={`${styles.btnAction} ${styles.downloadBtn} primaryBtn`} onClick={downloadGraph}>
                        Download
                    </button>
                </div>
                {graph.isDAG && <div className={styles.graphStyle}>
                    <p>DAG Mode:</p>
                    <select className={styles.graphStylesDropdown} defaultValue={dagMode} onChange={updateDagMode}>
                        {Object.keys(dagModes).map((mode, index) => {
                            return (
                                <option key={index} value={mode}>
                                    {mode}
                                </option>
                            )
                        })}
                    </select>
                </div>}
                <div className={styles.checkBox}>
                    <label htmlFor="show-particles">Show link particles</label>
                    <input type="checkbox" name="show-particles" defaultChecked={linkParticles} onChange={toggleLinkParticles} />
                </div>
                <div className={styles.checkBox} style={{ marginTop: "8px" }}>
                    <label htmlFor="zoom-to-fit">Zoom to fit</label>
                    <input type="checkbox" name="zoom-to-fit" defaultChecked={zoomToFit} onChange={toggleZoomToFit} />
                </div>
            </div>
            <ForceGraph2D
                width={width}
                height={height}
                ref={graphRef}
                linkWidth={2}
                linkDirectionalArrowLength={graph.isDirected ? 5 : undefined}
                nodeCanvasObject={handleDrawNode}
                linkCurvature={0.20}
                onNodeClick={handleNodeClick}
                cooldownTicks={zoomToFit ? 100 : undefined}
                onEngineStop={zoomToFit ? () => graphRef.current.zoomToFit(400) : undefined}
                linkDirectionalParticleColor={() => "#1E90FF"}
                linkDirectionalArrowColor={() => "#1E90FF"}
                linkDirectionalParticles={linkParticles ? 3 : undefined}
                linkDirectionalParticleWidth={linkParticles ? 3 : undefined}
                dagMode={dagModes[dagMode]}
                graphData={{
                    nodes: graph.nodes,
                    links: graph.links
                }}
            />
        </div>
    )
});