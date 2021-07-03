export function getNextTurn(
    teams: number,
    teamTurn: number,
    oppositeDirection: boolean
): number {
    if (oppositeDirection) {
        return (teamTurn - 1) % teams || teams;
    }

    // Ensure non-zero (e.g. if 3 teams: 1 -> 2 -> 3 -> 1)
    return (teamTurn + 1) % teams || teams;
}
