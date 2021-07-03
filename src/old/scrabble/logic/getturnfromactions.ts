import { parseAction } from "./parseaction";
import { actionChangesTurn } from "./actionchangesturn";
import { getNextTurn } from "./getnextturn";

export function getTurnFromActions(actions: string[], teams: number): number {
    let teamTurn = 1;

    actions.forEach((raw) => {
        const actionType = parseAction(raw)[0];
        if (actionChangesTurn(actionType)) {
            teamTurn = getNextTurn(teams, teamTurn, false);
        }
    });

    return teamTurn;
}
