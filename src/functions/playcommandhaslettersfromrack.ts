import * as _ from "underscore";
import { IMove } from "../interfaces/imove";
import { Letter } from "../enums/letter";
import { parseLetter } from "./parseletter";

/**
 * Makes sure that at least one of the rack's tiles is in the move.
 */
export function playCommandHasLettersFromRack(
    move: IMove,
    letters: Letter[]
): boolean {
    const moveLetters = _.map(move.letters, parseLetter);

    return _.intersection(moveLetters, letters).length > 0;
}
