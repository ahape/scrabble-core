import { ISquare } from "../interfaces/isquare";
import { parseBoard } from "./parseboard";
import { emptyBoard } from "../constants";

export function createNewBoard(): ISquare[][] {
    return parseBoard(emptyBoard);
}
