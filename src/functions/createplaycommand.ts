import * as _ from "underscore";
import { ISquare } from "../interfaces/isquare";
import { BOARD_X_LENGTH, BOARD_Y_LENGTH, coordinateChars } from "../constants";
import { parseSquareCoordinates } from "./parsesquarecoordinates";

/**
 * This function is for a UI implementation to create a play command.
 * It is expected that the UI context would only have knowledge of the letters
 * being played, and the letters on the board.
 * From that, we have to determine what the official "move" is.
 */
export function createPlayCommand(move: ISquare[], board: ISquare[][]): string {
    // First check that all of the squares from the move are in the same row or col
    const sameCol =
        _.unique(move.map((sq) => parseSquareCoordinates(sq)[0])).length == 1;
    const sameRow =
        _.unique(move.map((sq) => parseSquareCoordinates(sq)[1])).length == 1;

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
        const y = parseSquareCoordinates(move[0])[1];
        const sorted = _.sortBy(move, (sq) => parseSquareCoordinates(sq)[1]);
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
        // Should only be true if word ends at edge of board.
        if (passedFirst && passedLast)
            return `${word} ${
                coordinateChars.charAt(startingCoord) + (y + 1)
            } H`;
    } else {
        const x = parseSquareCoordinates(move[0])[0];
        const sorted = _.sortBy(move, (sq) => parseSquareCoordinates(sq)[0]);
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
        // Should only be true if word ends at edge of board.
        if (passedFirst && passedLast)
            return `${word} ${
                coordinateChars.charAt(x) + (startingCoord + 1)
            } V`;
    }

    throw new Error("Invalid move");
}
