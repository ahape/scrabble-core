import * as _ from "underscore";
import { ActionType } from "./actiontype";
import { createNewBoard } from "./createnewboard";
import { playMove } from "./playmove";
import { parseAction } from "./parseaction";
import { getNextTurn } from "./getnextturn";
import { actionChangesTurn } from "./actionchangesturn";
import { parsePlayCommand } from "./parseplaycommand";
import { createRacksFromActions } from "./createracksfromactions";

export function getScoresFromActions(
    rawActions: string[],
    teams: number
): number[] {
    let board = createNewBoard();
    let teamTurn = 1;
    const scores: number[] = _.times(teams, () => 0);
    rawActions.forEach((raw) => {
        const [actionType, commandPart] = parseAction(raw);

        switch (actionType) {
            case ActionType.Play:
                const result = playMove(parsePlayCommand(commandPart), board);
                board = result.board;
                scores[teamTurn - 1] += result.words.reduce(
                    (sum, w) => sum + w.points,
                    0
                );
                break;
            case ActionType.EndGame:
                const racks = createRacksFromActions(rawActions, teams);
                const prevTeamTurn = getNextTurn(teams, teamTurn, true);

                // The following is debatable
                // --------------------------
                // It's very rare, but in the event of the previous team
                // playing a bingo, and there being no possibility of them
                // drawing tiles for their next turn given the needs of the
                // other teams, then automatically award them all the
                // remaining tiles in the bag.
                if (commandPart) {
                    scores[prevTeamTurn - 1] += parseInt(commandPart, 10) || 0;
                }

                for (let i = 0; i < teams; i++) {
                    if (i === prevTeamTurn - 1) continue;

                    const points = racks[i].totalPoints();
                    scores[i] -= points;
                    scores[prevTeamTurn - 1] += points;
                }
                break;
            default:
                break;
        }

        if (actionChangesTurn(actionType)) {
            teamTurn = getNextTurn(teams, teamTurn, false);
        }
    });

    return scores;
}
