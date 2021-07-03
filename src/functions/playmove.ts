import * as ko from "knockout";
import { ISquare } from "../interfaces/isquare";
import { IMove } from "../interfaces/imove";
import { IPlayResult } from "../interfaces/iplayresult";
import { Letter } from "../enums/letter";
import { Multiplier } from "../enums/multiplier";
import { MultiplierType } from "../enums/multipliertype";
import { getPointsFromSquare } from "./getpointsfromsquare";
import { parseLetter } from "./parseletter";
import { printBoard } from "./printboard";
import { MAX_RACK_TILES } from "../constants";

const lowerCaseRx = /[a-z]/;

// Is first word?

export function playMove(move: IMove, board: ISquare[][]): IPlayResult {
    const isFirstWord = board.every((row) => row.every((sq) => !sq.played));
    const wordMultipliers: number[] = [];
    let connectsToPlayedSquare = false;
    let points = 0;
    let newlyPlayedSquares = 0;
    let result: IPlayResult = {
        board: ko.toJS(board),
        words: [],
        usedLetters: [],
    };

    if (move.isVertical) {
        let moveY = move.y;

        move.letters.forEach((letter) => {
            const sq = result.board[moveY][move.x];

            if (
                sq.played &&
                sq.letter !== letter &&
                sq.blankLetter !== letter
            ) {
                throw new Error("Invalid move");
            }

            if (!sq.played) {
                // Set the letter.
                sq.letter = parseLetter(letter);

                result.usedLetters.push(sq.letter);

                if (lowerCaseRx.test(letter)) sq.blankLetter = letter;
            } else {
                connectsToPlayedSquare = true;
            }

            // Extract the points.
            points += getPointsFromSquare(sq, wordMultipliers);

            if (!sq.played) {
                newlyPlayedSquares += 1;

                let crossingPoints = 0;
                let x = move.x;
                let crossSq: ISquare;
                const word: ISquare[] = [];
                const xLength = result.board[moveY].length;

                // If there is board space to the left
                if (x > 0) {
                    x--;
                    // Collect all horizontally intersecting letters on the
                    // left side of our vertical word.
                    do {
                        crossSq = result.board[moveY][x];

                        if (crossSq && crossSq.letter) {
                            word.unshift(crossSq);
                        }
                    } while (--x >= 0 && crossSq.letter);
                }

                if (word.length > 0) {
                    // Add our letter to the crossing word.
                    word.push(sq);
                }

                x = move.x;

                // If there is board space to the right.
                if (x < xLength - 1) {
                    x++;
                    // Collect all horizontally intersecting letters on the
                    // right side of our vertical word.
                    do {
                        crossSq = result.board[moveY][x];

                        if (crossSq && crossSq.letter) {
                            word.push(crossSq);
                        }
                    } while (++x < xLength && crossSq.letter);
                }

                // Add our letter to the crossing word if it hasn't yet been.
                if (word.length > 0 && word.indexOf(sq) === -1) {
                    word.unshift(sq);
                }

                const mults: number[] = [];
                word.forEach((_sq) => {
                    crossingPoints += getPointsFromSquare(_sq, mults);
                });
                mults.forEach((m) => (crossingPoints *= m));

                if (word.length > 0) {
                    connectsToPlayedSquare = true;
                    result.words.push({
                        word: word
                            .map((_sq) =>
                                _sq.blankLetter
                                    ? _sq.blankLetter.toLowerCase()
                                    : _sq.letter
                            )
                            .join(""),
                        points: crossingPoints,
                    });
                }
            }

            moveY++;
            sq.played = true;
        });
    } else {
        let moveX = move.x;

        move.letters.forEach((letter) => {
            const sq = result.board[move.y][moveX];

            if (
                sq.played &&
                sq.letter !== letter &&
                sq.blankLetter !== letter
            ) {
                throw new Error("Invalid move");
            }

            if (!sq.played) {
                sq.letter = parseLetter(letter);

                result.usedLetters.push(sq.letter);

                if (lowerCaseRx.test(letter)) sq.blankLetter = letter;
            } else {
                connectsToPlayedSquare = true;
            }

            points += getPointsFromSquare(sq, wordMultipliers);

            if (!sq.played) {
                newlyPlayedSquares += 1;

                let crossingPoints = 0;
                let y = move.y;
                let crossSq: ISquare;
                const word: ISquare[] = [];
                const yLength = result.board.length;

                if (y > 0) {
                    y--;

                    do {
                        crossSq = result.board[y][moveX];

                        if (crossSq && crossSq.letter) {
                            word.unshift(crossSq);
                        }
                    } while (--y >= 0 && crossSq.letter);
                }

                if (word.length > 0) {
                    // Add our letter to the crossing word
                    word.push(sq);
                }

                y = move.y;

                if (y < yLength - 1) {
                    y++;

                    do {
                        crossSq = result.board[y][moveX];

                        // starting right the NEXT left cell, add self + rest of
                        // cells until vacant one found
                        if (crossSq && crossSq.letter) {
                            word.push(crossSq);
                        }
                    } while (++y < yLength && crossSq.letter);
                }

                if (word.length > 0 && word.indexOf(sq) === -1) {
                    word.unshift(sq);
                }

                const mults: number[] = [];
                word.forEach((_sq) => {
                    crossingPoints += getPointsFromSquare(_sq, mults);
                });
                mults.forEach((m) => (crossingPoints *= m));

                if (word.length > 0) {
                    connectsToPlayedSquare = true;
                    result.words.push({
                        word: word
                            .map((_sq) =>
                                _sq.blankLetter
                                    ? _sq.blankLetter.toLowerCase()
                                    : _sq.letter
                            )
                            .join(""),
                        points: crossingPoints,
                    });
                }
            }

            moveX++;
            sq.played = true;
        });
    }

    if (isFirstWord && !result.board[7][7].played) {
        throw new Error("First word must include middle square");
    } else if (!isFirstWord && !connectsToPlayedSquare) {
        throw new Error("Word must connect to other words on the board");
    } else if (newlyPlayedSquares > MAX_RACK_TILES) {
        throw new Error("Word is larger than maximum amount of tiles");
    }

    wordMultipliers.forEach((mult) => {
        // Add up points for word in play command.
        points *= mult;
    });

    // Add the original word played.
    result.words.unshift({
        word: move.letters.join(""),
        points,
    });

    if (newlyPlayedSquares === MAX_RACK_TILES) {
        // Add bingo points, if applicable.
        result.words.push({
            word: "*BINGO*",
            points: 50,
        });
    }

    return result;
}
