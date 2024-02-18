
export function updateGraphLocalStorage(updatedData, networkName) {
    const graphs = JSON.parse(localStorage.getItem("graphs")) || [];
    localStorage.setItem("graphs", JSON.stringify([...graphs.map((x) => {
        if (x.networkName !== networkName) return x;
        else return {
            ...x,
            ...updatedData
        }
    })]));
}