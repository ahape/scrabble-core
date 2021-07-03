import { ActionType } from "./actiontype";

export function actionChangesTurn(actionType: ActionType): boolean {
    switch (actionType) {
        case ActionType.Play:
        case ActionType.Skip:
        case ActionType.Swap:
            return true;
        default:
            return false;
    }
}
