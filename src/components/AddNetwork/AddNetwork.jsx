import styles from "./AddNetwork.module.css";
import { useContext, useState, useRef } from "react";
import { GraphContext, nodeSize } from "../Main/Main";
import PopUpWrapper from "../../wrappers/PopUpWrapper/PopUpWrapper";
import { filterNodes } from "../../utils/filterNodes";
import { parseCSVFile } from "../../utils/parseCSVFile";
import { filterEdges } from "../../utils/filterEdges";
import { nodeTypes } from "../../utils/nodeTypes";
import { graphTypes } from "../../utils/graphTypes";
import { graphIsAcyclic } from "../../utils/graphIsAcyclic";

function AddNetwork({ setAddNetworkPopUp }) {
    const graphContext = useContext(GraphContext);
    const [nodeList, setNodeList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    
    const [nodeIDType, setNodeIDType] = useState(nodeTypes.Integer);
    const [graphType, setGraphType] = useState(graphTypes.Directed);

    const [networkName, setNetworkName] = useState("");
    const [nodeListFileName, setNodeListFileName] = useState("");
    const [edgeListFileName, setEdgeListFileName] = useState("");

    // Node list file input reference. Used for triggering 'click' event.
    const nodeListFileRef = useRef(null);
    // Edge list file input reference. Used for triggering 'click' event.
    const edgeListFileRef = useRef(null);

    // Changes the type of the node ID.
    function updateNodeIDType(e) {
        const type = e.target.value;
        setNodeIDType(type);
    }

    // Changes the graph type to either 'directed' or 'undirected', depending on user input.
    function updateGraphType(e) {
        const type = e.target.value;
        setGraphType(type);
    }

    // Changes the name of the network to the current value in the text box.
    function updateNetworkName(e) {
        const name = e.target.value;
        setNetworkName(name);
    }

    function validInputs() {
        return nodeList.length > 0 && edgeList.length > 0 && networkName !== "" &&
        !graphContext.graphs.map((graph) => graph.networkName).includes(networkName);
    }

    // Filters the list of nodes and edges inputted by the user and
    // runs error checking logic to ensure that the inputs are valid.
    // Creates a graph using the filtered nodes and edges.
    function visualiseNetwork() {
        const filteredNodes = filterNodes(nodeList, nodeIDType);
        const filteredEdges = filterEdges(edgeList, nodeIDType, new Set(filteredNodes));
        
        // If no valid nodes were found in the node list, reject it.
        if (filteredNodes.length === 0) {
            console.log("Your graph must have at least one valid node.");
            return;
        }

        // If at least one node was found to be invalid, inform the user but proceed with graph creation.
        if (filteredNodes.length < nodeList.length) {
            console.log(`${nodeList.length - filteredNodes.length} nodes are invalid and will be ignored.`);
        }

        // If at least one edge was found to be invalid, inform the user but proceed with graph creation.
        if (filteredEdges.length < edgeList.length) {
            console.log(`${edgeList.length - filteredEdges.length} edges are invalid and will be ignored.`);
        }

        // Pass filtered nodes and edges to 'createGraph' function for creation.
        createGraph(filteredNodes, filteredEdges);
        // Close 'Add Network' pop up window.
        setAddNetworkPopUp(false);
    }

    // Creates a new graph using the filtered nodes and edges
    // from the CSV files and updates the state.
    function createGraph(nodes, edges) {
        const nodeArr = nodes.map((node) => { return { id: node, size: nodeSize } });
        const nodeMap = new Map(nodeArr.map(pair => [pair.id, pair]));
        const edgeObjects = edges.map((edge) => { return { source: nodeMap.get(edge[0]), target: nodeMap.get(edge[1]) }});
        
        // Data about the graph to be added including its nodes, edges, etc.
        const data = {
            nodes: nodeArr,
            links: edges.map((edge) => { return { source: edge[0], target: edge[1] }}),
            isDirected: graphType === graphTypes.Directed,
            networkName: networkName,
            showParticles: false,
            styles: Object.fromEntries(new Map(nodeArr.map((node) => {
                return [
                    node.id,
                    {
                        fillStyle: "white",
                        strokeStyle: "#22BEC8",
                        textStyle: "#121212"
                    }
                ]
            })))
        };

        // Extra meta data for graphs that are directed.
        const meta = graphType === graphTypes.Directed && graphIsAcyclic({ ...data, links: edgeObjects }) ? {
            isDAG: true,
            dagMode: "None"
        } : {};

        const newGraph = {
            ...data,
            ...meta
        };

        // Update graphs in local storage session.
        const graphs = JSON.parse(localStorage.getItem("graphs")) || [];
        localStorage.setItem("graphs", JSON.stringify([...graphs, newGraph]));

        // Adds the new graph to the list of graphs.
        graphContext.setGraphs((graphs) => {
            return [
                ...graphs,
                newGraph
            ]
        });
    }

    // File upload trigger that grabs the node list CSV file
    // and passes it to the 'parseCSVFile' function for it to be
    // parsed into a list.
    async function uploadNodeList(e) {
        // Node list CSV file.
        const file = e.target.files[0];

        try {
            const nodes = await parseCSVFile(file);
            setNodeListFileName(file.name);
            setNodeList(nodes);
        }
        catch (error) {
            console.log(error);
        }
    }

    // File upload trigger than grabs the edge list CSV file
    // and passes it to the 'parseCSVFile' function for it to be
    // parsed into a list.
    async function uploadEdgeList(e) {
        // Edge list CSV file.
        const file = e.target.files[0];

        try {
            const edges = await parseCSVFile(file);
            setEdgeListFileName(file.name);
            setEdgeList(edges);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <PopUpWrapper setPopUp={setAddNetworkPopUp} title="Add a network">
            <div className={styles.wrapper}>
                <div>
                    <div className={styles.fileUpload}>
                        <p>Node list:</p>
                        <input 
                            type="file" 
                            accept=".csv"
                            onChange={uploadNodeList} 
                            hidden={true} 
                            ref={nodeListFileRef} 
                        />
                        {nodeListFileName !== "" && 
                        <p className="sideText">
                            {nodeListFileName}
                        </p>}
                        <button className={`${styles.uploadFileBtn} primaryBtn`} 
                        onClick={() => nodeListFileRef.current.click()}>
                            Upload a file
                        </button>
                    </div>
                    <p className={styles.type}>Node ID Type:</p>
                    <select className={styles.typeDropdown} onChange={updateNodeIDType} defaultValue={nodeTypes.Integer}>
                        {Object.keys(nodeTypes).map((type, index) => {
                            return (
                                <option value={type} key={index}>
                                    {type}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <div className={styles.fileUpload}>
                        <p>Edge list:</p>
                        <input 
                            type="file" 
                            accept=".csv"
                            onChange={uploadEdgeList} 
                            hidden={true} 
                            ref={edgeListFileRef} 
                        />
                        {edgeListFileName !== "" && 
                        <p className="sideText">
                            {edgeListFileName}
                        </p>}
                        <button className={`${styles.uploadFileBtn} primaryBtn`}
                        onClick={() => edgeListFileRef.current.click()}>
                            Upload a file
                        </button>
                    </div>
                    <p className={styles.type}>Graph Type:</p>
                    <select className={styles.typeDropdown} onChange={updateGraphType} defaultValue={graphTypes.Directed}>
                        {Object.keys(graphTypes).map((type, index) => {
                            return (
                                <option value={type} key={index}>
                                    {type}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <p className={`${styles.networkName} ${styles.type}`}>
                Network name:
            </p>
            <input 
                type="text" 
                className={styles.networkNameInput} 
                placeholder="E.g. LinkedIn network" 
                onChange={updateNetworkName}
            />
            <button className={`${styles.visualiseNetwork} ${!validInputs() ? "disabledBtn" : ""} primaryBtn`} onClick={visualiseNetwork}>
                Visualise Network
            </button>
        </PopUpWrapper>
    )
}

export default AddNetwork;