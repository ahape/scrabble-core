import * as _ from "underscore";
import { ISquare } from "./isquare";
import { coordinateChars } from "./coordinatechars";
import { BOARD_X_LENGTH, BOARD_Y_LENGTH } from "./constants";

export function createCommandFromMove(
    move: ISquare[],
    board: ISquare[][]
): string {
    // move.sort((a, b) => a.id.localeCompare(b.id));

    // First check that all of the squares from the move are in the same row/col
    const sameRow = _.unique(move.map((sq) => sq.id.substr(1))).length == 1;
    const sameCol = _.unique(move.map((sq) => sq.id.charAt(0))).length == 1;
    if (!sameRow && !sameCol)
        throw new Error(
            "Move letters weren't placed on the same row or column"
        );

    let word = "";
    let passedFirst = false;
    let passedLast = false;
    let started = false;
    let startingCoord = 0;

    if (sameRow) {
        const y = +move[0].id.substr(1) - 1;
        const sorted = _.sortBy(move, (sq) => sq.id.charAt(0));
        const first = sorted[0];
        const last = _.last(sorted)!;
        for (let x = 0; x < BOARD_X_LENGTH; x++) {
            const sq = board[y][x];
            // Does the square consist of a letter?
            if (sq.played || move.some((m) => m.id === sq.id)) {
                if (!started) {
                    started = true;
                    startingCoord = x;
                    word = "";
                }

                word += sq.blankLetter
                    ? sq.blankLetter.toLowerCase()
                    : sq.letter;

                if (!passedFirst && sq.id === first.id) passedFirst = true;
                if (!passedLast && sq.id === last.id) passedLast = true;
            } else if (started) {
                if (passedFirst && passedLast)
                    return `${word} ${
                        coordinateChars.charAt(startingCoord) + (y + 1)
                    } H`;
                if (passedFirst || passedLast)
                    throw new Error("Move doesn't entirely connect");
                started = false;
            }
        }
        // Should only trigger if word ends at edge of board.
        if (passedFirst && passedLast)
            return `${word} ${
                coordinateChars.charAt(startingCoord) + (y + 1)
            } H`;
    } else {
        const x = coordinateChars.indexOf(move[0].id.charAt(0));
        const sorted = _.sortBy(move, (sq) => +sq.id.substr(1));
        const first = sorted[0];
        const last = _.last(sorted)!;
        for (let y = 0; y < BOARD_Y_LENGTH; y++) {
            const sq = board[y][x];

            if (sq.played || move.some((m) => m.id === sq.id)) {
                if (!started) {
                    started = true;
                    startingCoord = y;
                    word = "";
                }

                word += sq.blankLetter
                    ? sq.blankLetter.toLowerCase()
                    : sq.letter;

                if (!passedFirst && sq.id === first.id) passedFirst = true;
                if (!passedLast && sq.id === last.id) passedLast = true;
            } else if (started) {
                if (passedFirst && passedLast)
                    return `${word} ${
                        coordinateChars.charAt(x) + (startingCoord + 1)
                    } V`;
                if (passedFirst || passedLast)
                    throw new Error("Move doesn't entirely connect");
                started = false;
            }
        }
        // Should only trigger if word ends at edge of board.
        if (passedFirst && passedLast)
            return `${word} ${
                coordinateChars.charAt(x) + (startingCoord + 1)
            } V`;
    }

    throw new Error("Invalid move");
}
