import { ISquare } from "./logic/isquare";
import { Letter } from "./logic/letter";

export interface IGameStatus {
    bag: string[];
    board: string[][];
    racks: string[][];
    teamTurn: number;
    scores: number[];
    moveLog: string[];
    gameOver: boolean;
}
