import * as _ from "underscore";
import {
    BOARD_X_LENGTH,
    coordinateChars,
    coordinatesToMultiplier,
    coordinatesToMultiplierType,
} from "../constants";
import { ISquare } from "../interfaces/isquare";
import { Letter } from "../enums/letter";
import { parseLetter } from "./parseletter";

const lowerCaseRx = /[a-z]/;

export function parseBoard(board: string): ISquare[][] {
    const captures: string[] = [];
    const rx = /\|([A-Za-z ])/g;
    let result: RegExpExecArray | null = null;

    while ((result = rx.exec(board))) {
        captures.push(result[1]?.trim() || "");
    }

    return _.chunk(captures, BOARD_X_LENGTH).map((letters: string[], i) => {
        return letters.map(
            (letter, j): ISquare => {
                const coordinates = coordinateChars.charAt(j) + (i + 1);
                const isBlank = lowerCaseRx.test(letter);
                return {
                    id: coordinates,
                    letter: parseLetter(letter),
                    played: letter !== Letter.UNSET,
                    blankLetter: isBlank ? letter.toUpperCase() : "",
                    multiplier: coordinatesToMultiplier[coordinates],
                    multiplierType: coordinatesToMultiplierType[coordinates],
                };
            }
        );
    });
}
