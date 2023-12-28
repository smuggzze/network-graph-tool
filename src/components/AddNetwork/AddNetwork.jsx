import styles from "./AddNetwork.module.css";
import { useContext, useState, useRef } from "react";
import { GraphContext, nodeSize } from "../Main/Main";
import PopUpWrapper from "../../wrappers/PopUpWrapper";
import { filterNodes } from "../../utils/filterNodes";
import { parseCSVFile } from "../../utils/parseCSVFile";
import { filterEdges } from "../../utils/filterEdges";

export const nodeTypes = {
    Integer: "Integer",
    String: "String"
}

export const graphTypes = {
    Undirected: "Undirected",
    Directed: "Directed"
}

function AddNetwork({ toggleNetworkPopUp }) {
    const graphContext = useContext(GraphContext);
    const [nodeList, setNodeList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    const [nodeIDType, setNodeIDType] = useState(nodeTypes.Integer);
    const [graphType, setGraphType] = useState(graphTypes.Directed);

    const [networkName, setNetworkName] = useState("");
    const [nodeListFileName, setNodeListFileName] = useState("");
    const [edgeListFileName, setEdgeListFileName] = useState("");

    const nodeListFileRef = useRef(null);
    const edgeListFileRef = useRef(null);

    function updateNodeIDType(e) {
        const type = e.target.value;
        setNodeIDType(type);
    }

    function updateGraphType(e) {
        const type = e.target.value;
        setGraphType(type);
    }

    function updateNetworkName(e) {
        const name = e.target.value;
        setNetworkName(name);
    }

    function visualiseNetwork() {
        const filteredNodes = filterNodes(nodeList, nodeIDType);
        const filteredEdges = filterEdges(edgeList, nodeIDType, new Set(filteredNodes));
 
        if (filteredNodes.length === 0) {
            console.log("Your graph must have at least one valid node.");
            return;
        }

        if (filteredNodes.length < nodeList.length) {
            console.log(`${nodeList.length - filteredNodes.length} nodes are invalid and will be ignored.`);
        }

        if (filteredEdges.length < edgeList.length) {
            console.log(`${edgeList.length - filteredEdges.length} edges are invalid and will be ignored.`);
        }

        createGraph(filteredNodes, filteredEdges);
        toggleNetworkPopUp();
    }

    function createGraph(nodes, edges) {
        const newGraph = {
            nodes: nodes.map((node) => { return { id: node, size: nodeSize } }),
            links: edges.map((edge) => { return { source: edge[0], target: edge[1] }}),
            networkName: networkName,
            isDirected: graphType === graphTypes.Directed
        };

        graphContext.setGraphs((graphs) => {
            return [
                ...graphs,
                newGraph
            ]
        });
    }

    async function uploadNodeList(e) {
        const file = e.target.files[0];

        try {
            const nodes = await parseCSVFile(file);
            setNodeList(nodes);
            setNodeListFileName(file.name);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function uploadEdgeList(e) {
        const file = e.target.files[0];

        try {
            const edges = await parseCSVFile(file);
            setEdgeList(edges);
            setEdgeListFileName(file.name);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <PopUpWrapper>
            <div className={styles.addNetworkPopUp}>
                <h1 className={styles.title}>Add a network</h1>
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
                            <p className={`side-text ${styles.fileName}`}>
                                {nodeListFileName}
                            </p>}
                            <button className={`${styles.uploadFileBtn} primary-btn`} 
                            onClick={() => nodeListFileRef.current.click()}>
                                Upload a file
                            </button>
                        </div>
                        <p className={styles.type}>Node ID Type:</p>
                        <select className={styles.typeDropdown} onChange={updateNodeIDType}
                        defaultValue={nodeTypes.Integer}>
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
                            <p className={`side-text ${styles.fileName}`}>
                                {edgeListFileName}
                            </p>}
                            <button className={`${styles.uploadFileBtn} primary-btn`}
                            onClick={() => edgeListFileRef.current.click()}>
                                Upload a file
                            </button>
                        </div>
                        <p className={styles.type}>Graph Type:</p>
                        <select className={styles.typeDropdown} onChange={updateGraphType}
                        defaultValue={graphTypes.Directed}>
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
                <button className={`${styles.visualiseNetwork} primary-btn`} 
                onClick={visualiseNetwork}>
                    Visualise Network
                </button>
            </div>
        </PopUpWrapper>
    )
}

export default AddNetwork;