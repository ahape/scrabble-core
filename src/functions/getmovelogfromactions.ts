import { ActionType } from "../enums/actiontype";
import { createNewBoard } from "./createnewboard";
import { playMove } from "./playmove";
import { parseAction } from "./parseaction";
import { getNextTurn } from "./getnextturn";
import { actionChangesTurn } from "./actionchangesturn";
import { parsePlayCommand } from "./parseplaycommand";

export function getMoveLogFromActions(
    rawActions: string[],
    teams: number
): string[] {
    let board = createNewBoard();
    let teamTurn = 1;
    const moves: string[] = [];
    rawActions.forEach((raw) => {
        const [actionType, commandPart] = parseAction(raw);

        let move = "";

        switch (actionType) {
            case ActionType.NewGame:
                move += "Game started";
                break;
            case ActionType.Skip:
                move += `Team ${teamTurn} skipped`;
                break;
            case ActionType.Draw:
                move += `Team ${teamTurn} drew ${commandPart.length} tiles`;
                break;
            case ActionType.Swap:
                move += `Team ${teamTurn} swapped ${
                    commandPart.split(" ")[0].length
                } tiles`;
                break;
            case ActionType.Play:
                move += `Team ${teamTurn} played `;
                const result = playMove(parsePlayCommand(commandPart), board);
                board = result.board;
                const words: string[] = [];
                for (const word of result.words)
                    words.push(`${word.word} (${word.points})`);
                move += words.join(", ");
                break;
            case ActionType.EndGame:
                move += "Game over";
                break;
            default:
                break;
        }

        moves.push(move);

        if (actionChangesTurn(actionType)) {
            teamTurn = getNextTurn(teams, teamTurn, false);
        }
    });

    return moves;
}
