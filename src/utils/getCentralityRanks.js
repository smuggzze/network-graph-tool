import { graphColours } from "./graphColours";

export function getCentralityRanks(centralities) {
    const sortedCentralities = centralities.sort((a, b) => b[1] - a[1]);
    const numRanks = Object.keys(graphColours.Centrality).length;
    const nodesPerRank = Math.floor(centralities.length / numRanks);
    const ranks = {};

    for (let i = 0; i <= numRanks; i++) {
        const startIndex = i * nodesPerRank;
        const endIndex = (i + 1) * nodesPerRank < centralities.length ? (i + 1) * nodesPerRank : centralities.length;
        const rankLabel = Object.keys(graphColours.Centrality)[Math.min(i, numRanks - 1)];

        for (let j = startIndex; j < endIndex; j++) {
            ranks[sortedCentralities[j][0]] = { ...graphColours.Centrality[rankLabel] };
        }
    }

    return ranks;
}