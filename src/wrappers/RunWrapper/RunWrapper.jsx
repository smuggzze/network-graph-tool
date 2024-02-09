
function RunWrapper({ children }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {children}
        </div>
    )
}

export default RunWrapper;