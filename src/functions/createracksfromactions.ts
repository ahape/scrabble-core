import * as _ from "underscore";
import { Rack } from "../classes/rack";
import { ActionType } from "../enums/actiontype";
import { createNewBoard } from "./createnewboard";
import { playMove } from "./playmove";
import { parseLetter } from "./parseletter";
import { parseAction } from "./parseaction";
import { getNextTurn } from "./getnextturn";
import { actionChangesTurn } from "./actionchangesturn";
import { parsePlayCommand } from "./parseplaycommand";

export function createRacksFromActions(
    rawActions: string[],
    teams: number
): Rack[] {
    let board = createNewBoard();
    let teamTurn = 1;
    const racks = _.times(teams, () => new Rack());
    rawActions.forEach((raw) => {
        const [actionType, commandPart] = parseAction(raw);
        const rack = racks[teamTurn - 1];

        switch (actionType) {
            case ActionType.Play:
                const result = playMove(parsePlayCommand(commandPart), board);
                board = result.board;
                rack.remove(result.usedLetters);
                break;
            case ActionType.Swap:
                const [sExchanged, sDrawn] = commandPart.split(" ");
                const exchanged = sExchanged.split("").map(parseLetter);
                const drawn = sDrawn.split("").map(parseLetter);
                rack.remove(exchanged);
                rack.add(drawn);
                break;
            case ActionType.Draw:
                rack.add(commandPart.split("").map(parseLetter));
                break;
            default:
                break;
        }

        if (actionChangesTurn(actionType)) {
            teamTurn = getNextTurn(teams, teamTurn, false);
        }
    });

    return racks;
}
