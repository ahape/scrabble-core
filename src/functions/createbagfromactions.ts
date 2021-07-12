import { Bag } from "../classes/bag";
import { parseAction } from "./parseaction";
import { parseLetter } from "./parseletter";
import { ActionType } from "../enums/actiontype";

export function createBagFromActions(actions: string[]): Bag {
    const bag = new Bag();

    actions.forEach((raw) => {
        const [actionType, commandPart] = parseAction(raw);

        switch (actionType) {
            case ActionType.Draw: {
                const letters = commandPart.split("").map(parseLetter);
                bag.remove(letters);
                break;
            }
            case ActionType.Swap: {
                // A swap command looks like: "SWAP ABC DEF".
                // "SWAP" is the action
                // "ABC DEF" is the command part
                // "ABC" are the letters being exchanged
                // "DEF" are the letters being drawn
                const [sExchanged, sDrawn] = commandPart.split(" ");
                const exchanged = sExchanged.split("").map(parseLetter);
                const drawn = sDrawn.split("").map(parseLetter);
                bag.remove(drawn);
                bag.add(exchanged);
                break;
            }
            default:
                break;
        }
    });

    return bag;
}
