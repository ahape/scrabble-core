import { IPlayedWord } from "./iplayedword";
import { ISquare } from "./isquare";
import { Letter } from "../enums/letter";

export interface IPlayResult {
    /** All of the words that contribute to the move's score. */
    words: IPlayedWord[];
    /** The new state of the board. */
    board: ISquare[][];
    /** Letters used from rack */
    usedLetters: Letter[];
}
