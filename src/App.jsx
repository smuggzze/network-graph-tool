import ForceGraph2D from 'react-force-graph-2d';

function App() {
  return (
    <ForceGraph2D graphData={{
        nodes: [{ id: 1 }, { id : 2 }, { id: 3 }],
        links: [{ source: 1, target: 3 }, { source: 2, target: 1 }]
    }} />
  )
}

export default App