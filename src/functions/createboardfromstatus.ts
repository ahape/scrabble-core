import { Letter } from "../enums/letter";
import { IGameStatus } from "../interfaces/igamestatus";
import { ISquare } from "../interfaces/isquare";
import { createNewBoard } from "./createnewboard";

export function createBoardFromStatus(status: IGameStatus): ISquare[][] {
    const statusBoard = status.board;
    const newBoard = createNewBoard();

    for (let y = 0; y < statusBoard.length; y++)
        for (let x = 0; x < statusBoard[y].length; x++) {
            const square = newBoard[y][x];
            const cha = statusBoard[y][x];
            if (cha) {
                square.played = true;
                if (/[a-z]/.test(cha)) {
                    square.letter = Letter.BLANK;
                    square.blankLetter = cha;
                } else {
                    square.letter = cha as Letter;
                }
            }
        }

    return newBoard;
}
