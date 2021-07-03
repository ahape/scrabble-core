import { letterValueMap } from "./lettervaluemap";
import { ISquare } from "./isquare";
import { Letter } from "./letter";
import { MultiplierType } from "./multipliertype";
import { parseLetter } from "./parseletter";

/**
 * Returns points for a letter played on a square.
 * In the case of a square representing a word-multiplier,
 * the multiplier is added to the `multipliers` argument for
 * later evaluation.
 */
export function getPointsFromSquare(sq: ISquare, multipliers: number[])
    : number
{
    let points = letterValueMap[parseLetter(sq.letter)];

    if (!sq.played) {
        if (sq.multiplierType === MultiplierType.Word) {
            multipliers.push(sq.multiplier);
        } else if (sq.multiplierType === MultiplierType.Letter) {
            points *= sq.multiplier;
        }
    }

    return points;
}

