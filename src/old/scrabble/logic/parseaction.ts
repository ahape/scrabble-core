import { ActionType } from "./actiontype";

export function parseAction(rawAction: string): [ActionType, string] {
    const [action, ...rest] = (rawAction || "").split(" ");
    const actionType = action.toUpperCase() as ActionType;
    const commandPart = rest && rest.length > 0 ? rest.join(" ") : "";
    return [actionType, commandPart];
}
