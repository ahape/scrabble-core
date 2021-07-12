import { ISquare } from "../interfaces/isquare";
import { Multiplier } from "../enums/multiplier";
import { MultiplierType } from "../enums/multipliertype";
import { BOARD_X_LENGTH as len } from "../constants";

export function printBoard(board: ISquare[][]): string {
    const template = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
    `;

    let i = 0;
    return template.replace(/X/g, () => {
        const sq = board[Math.floor(i / len)][i % len];
        i += 1;
        const letter = sq.blankLetter || sq.letter || " ";
        if (letter == " " && sq.multiplier != Multiplier.None) {
            if (
                sq.multiplier == Multiplier.Double &&
                sq.multiplierType == MultiplierType.Letter
            )
                return ".";
            if (
                sq.multiplier == Multiplier.Triple &&
                sq.multiplierType == MultiplierType.Letter
            )
                return ":";
            if (
                sq.multiplier == Multiplier.Double &&
                sq.multiplierType == MultiplierType.Word
            )
                return "'";
            if (
                sq.multiplier == Multiplier.Triple &&
                sq.multiplierType == MultiplierType.Word
            )
                return '"';
        }
        return letter;
    });
}
