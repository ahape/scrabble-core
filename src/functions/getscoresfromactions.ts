import * as _ from "underscore";
import { ActionType } from "../enums/actiontype";
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
            case ActionType.Play: {
                const result = playMove(parsePlayCommand(commandPart), board);
                board = result.board;
                scores[teamTurn - 1] += result.words.reduce(
                    (sum, w) => sum + w.points,
                    0
                );
                break;
            }
            case ActionType.EndGame: {
                const racks = createRacksFromActions(rawActions, teams);

                // First empty rack gets all the other rack's points.
                const emptyRackIndex = _.findIndex(racks, (r) => r.isEmpty());

                // If no empty rack, no points added/subtracted.
                for (let i = 0; emptyRackIndex > -1 && i < teams; i++) {
                    if (i === emptyRackIndex) continue;

                    const points = racks[i].totalPoints();
                    scores[i] -= points;
                    scores[emptyRackIndex] += points;
                }
                break;
            }
            default:
                break;
        }

        if (actionChangesTurn(actionType)) {
            teamTurn = getNextTurn(teams, teamTurn, false);
        }
    });

    return scores;
}
