import { ISquare } from "../interfaces/isquare";
import { createNewBoard } from "./createnewboard";
import { parsePlayCommand } from "./parseplaycommand";
import { parseAction } from "./parseaction";
import { playMove } from "./playmove";

export function createBoardFromActions(actions: string[]): ISquare[][] {
    let board = createNewBoard();

    actions
        // Hacky way of filtering to all PLAY actions
        .filter((act) => act.search(/PLAY /i) === 0)
        .map((act) => parseAction(act)[1])
        .forEach((cmd) => {
            const move = parsePlayCommand(cmd);
            const result = playMove(move, board);
            board = result.board;
        });

    return board;
}
