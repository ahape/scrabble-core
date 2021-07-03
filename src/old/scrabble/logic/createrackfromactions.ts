import { Rack } from "../rack";
import { createRacksFromActions } from "./createracksfromactions";
import { getTurnFromActions } from "./getturnfromactions";

export function createRackFromActions(
    rawActions: string[],
    teams: number
): Rack {
    const racks = createRacksFromActions(rawActions, teams);
    const teamTurn = getTurnFromActions(rawActions, teams);

    // Rack index = team-number - 1 (since team counting starts at 1)
    return racks[teamTurn - 1];
}
