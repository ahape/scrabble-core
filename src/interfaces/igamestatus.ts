export interface IGameStatus {
    bag: string[];
    board: string[][];
    racks: string[][];
    teamTurn: number;
    scores: number[];
    moveLog: string[];
    gameOver: boolean;
}
