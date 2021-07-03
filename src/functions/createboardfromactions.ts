import { ISquare } from "../interfaces/isquare";
import { createNewBoard } from "./createnewboard";
import { parsePlayCommand } from "./parseplaycommand";
import { playMove } from "./playmove";

export function createBoardFromActions(rawActions: string[]): ISquare[][] {
    let board = createNewBoard();

    rawActions
        .filter((act) => act.search(/PLAY /i) === 0)
        .map((act) => act.substr("PLAY ".length))
        .forEach((cmd) => {
            const move = parsePlayCommand(cmd);
            const result = playMove(move, board);
            board = result.board;
        });

    return board;
}
