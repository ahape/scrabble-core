import * as _ from "underscore";
import { IMove } from "../interfaces/imove";
import { Letter } from "../enums/letter";
import { coordinateChars } from "../constants";

const playCommandRx = /^(\w+) ([A-Oa-o])(1?[0-9]) ([HhVv])$/;

export function parsePlayCommand(playCommand: string): IMove {
    const parsed = playCommandRx.exec(playCommand);

    if (!parsed) {
        throw new Error("Bad command");
    }

    const [word, startX, startY, dir] = parsed.slice(-4);

    if (_.any([word, startX, startY, dir], _.isUndefined)) {
        throw new Error("Bad command");
    }

    if (word.length < 2) {
        throw new Error("Word must be at least 2 letters long");
    }

    return {
        x: coordinateChars.indexOf(startX.toUpperCase()),
        y: parseInt(startY, 10) - 1,
        isVertical: dir.toUpperCase() === "V",
        letters: word.split("") as Letter[],
        id: startX + startY,
    };
}
