import { Bag } from "../bag";
import { parseAction } from "./parseaction";
import { parseLetter } from "./parseletter";
import { ActionType } from "./actiontype";
import { Letter } from "./letter";

export function createBagFromActions(actions: string[]): Bag {
    const bag = new Bag();

    actions.forEach((raw) => {
        const [actionType, commandPart] = parseAction(raw);

        switch (actionType) {
            case ActionType.Draw:
                const letters = commandPart.split("").map(parseLetter);
                bag.remove(letters);
                break;
            case ActionType.Swap:
                const [sExchanged, sDrawn] = commandPart.split(" ");
                const exchanged = sExchanged.split("").map(parseLetter);
                const drawn = sDrawn.split("").map(parseLetter);
                bag.remove(drawn);
                bag.add(exchanged);
                break;
            default:
                break;
        }
    });

    return bag;
}
