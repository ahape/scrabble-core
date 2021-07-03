import * as _ from "underscore";
import { Letter } from "./enums/letter";
import { Multiplier } from "./enums/multiplier";
import { MultiplierType } from "./enums/multipliertype";

export const MAX_RACK_TILES = 7;
export const BOARD_X_LENGTH = 15;
export const BOARD_Y_LENGTH = 15;
export const coordinateChars = "ABCDEFGHIJKLMNO";
export const emptyBoard = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| | | | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | | | | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | | | | | | | | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | | | |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
`;
export const startingBagLetters = _.flatten([
    _.times(2, () => Letter.BLANK),
    _.times(9, () => Letter.A),
    _.times(2, () => Letter.B),
    _.times(2, () => Letter.C),
    _.times(4, () => Letter.D),
    _.times(12, () => Letter.E),
    _.times(2, () => Letter.F),
    _.times(3, () => Letter.G),
    _.times(2, () => Letter.H),
    _.times(9, () => Letter.I),
    _.times(1, () => Letter.J),
    _.times(1, () => Letter.K),
    _.times(4, () => Letter.L),
    _.times(2, () => Letter.M),
    _.times(6, () => Letter.N),
    _.times(8, () => Letter.O),
    _.times(2, () => Letter.P),
    _.times(1, () => Letter.Q),
    _.times(6, () => Letter.R),
    _.times(4, () => Letter.S),
    _.times(6, () => Letter.T),
    _.times(4, () => Letter.U),
    _.times(2, () => Letter.V),
    _.times(2, () => Letter.W),
    _.times(1, () => Letter.X),
    _.times(2, () => Letter.Y),
    _.times(1, () => Letter.Z),
]);

export const letterValueMap: { [key in Letter]: number } = {
    [Letter.UNSET]: 0,
    [Letter.BLANK]: 0,
    [Letter.A]: 1,
    [Letter.B]: 3,
    [Letter.C]: 3,
    [Letter.D]: 2,
    [Letter.E]: 1,
    [Letter.F]: 4,
    [Letter.G]: 2,
    [Letter.H]: 4,
    [Letter.I]: 1,
    [Letter.J]: 8,
    [Letter.K]: 5,
    [Letter.L]: 1,
    [Letter.M]: 3,
    [Letter.N]: 1,
    [Letter.O]: 1,
    [Letter.P]: 3,
    [Letter.Q]: 10,
    [Letter.R]: 1,
    [Letter.S]: 1,
    [Letter.T]: 1,
    [Letter.U]: 1,
    [Letter.V]: 4,
    [Letter.W]: 4,
    [Letter.X]: 8,
    [Letter.Y]: 4,
    [Letter.Z]: 10,
};
export const coordinatesToMultiplier: Record<string, Multiplier> = {
    // Triple words
    A1: Multiplier.Triple,
    H1: Multiplier.Triple,
    O1: Multiplier.Triple,
    A8: Multiplier.Triple,
    O8: Multiplier.Triple,
    A15: Multiplier.Triple,
    H15: Multiplier.Triple,
    O15: Multiplier.Triple,
    // Double words
    B2: Multiplier.Double,
    N2: Multiplier.Double,
    C3: Multiplier.Double,
    M3: Multiplier.Double,
    D4: Multiplier.Double,
    L4: Multiplier.Double,
    E5: Multiplier.Double,
    K5: Multiplier.Double,
    H8: Multiplier.Double,
    E11: Multiplier.Double,
    K11: Multiplier.Double,
    D12: Multiplier.Double,
    L12: Multiplier.Double,
    C13: Multiplier.Double,
    M13: Multiplier.Double,
    B14: Multiplier.Double,
    N14: Multiplier.Double,
    // Triple letters
    F2: Multiplier.Triple,
    J2: Multiplier.Triple,
    B6: Multiplier.Triple,
    F6: Multiplier.Triple,
    J6: Multiplier.Triple,
    N6: Multiplier.Triple,
    B10: Multiplier.Triple,
    F10: Multiplier.Triple,
    J10: Multiplier.Triple,
    N10: Multiplier.Triple,
    F14: Multiplier.Triple,
    J14: Multiplier.Triple,
    // Double letters
    D1: Multiplier.Double,
    L1: Multiplier.Double,
    G3: Multiplier.Double,
    I3: Multiplier.Double,
    A4: Multiplier.Double,
    H4: Multiplier.Double,
    O4: Multiplier.Double,
    C7: Multiplier.Double,
    G7: Multiplier.Double,
    I7: Multiplier.Double,
    M7: Multiplier.Double,
    D8: Multiplier.Double,
    L8: Multiplier.Double,
    C9: Multiplier.Double,
    G9: Multiplier.Double,
    I9: Multiplier.Double,
    M9: Multiplier.Double,
    A12: Multiplier.Double,
    H12: Multiplier.Double,
    O12: Multiplier.Double,
    G13: Multiplier.Double,
    I13: Multiplier.Double,
    D15: Multiplier.Double,
    L15: Multiplier.Double,
};
export const coordinatesToMultiplierType: Record<string, MultiplierType> = {
    // Triple words
    A1: MultiplierType.Word,
    H1: MultiplierType.Word,
    O1: MultiplierType.Word,
    A8: MultiplierType.Word,
    O8: MultiplierType.Word,
    A15: MultiplierType.Word,
    H15: MultiplierType.Word,
    O15: MultiplierType.Word,
    // Double words
    B2: MultiplierType.Word,
    N2: MultiplierType.Word,
    C3: MultiplierType.Word,
    M3: MultiplierType.Word,
    D4: MultiplierType.Word,
    L4: MultiplierType.Word,
    E5: MultiplierType.Word,
    K5: MultiplierType.Word,
    H8: MultiplierType.Word,
    E11: MultiplierType.Word,
    K11: MultiplierType.Word,
    D12: MultiplierType.Word,
    L12: MultiplierType.Word,
    C13: MultiplierType.Word,
    M13: MultiplierType.Word,
    B14: MultiplierType.Word,
    N14: MultiplierType.Word,
    // Triple letters
    F2: MultiplierType.Letter,
    J2: MultiplierType.Letter,
    B6: MultiplierType.Letter,
    F6: MultiplierType.Letter,
    J6: MultiplierType.Letter,
    N6: MultiplierType.Letter,
    B10: MultiplierType.Letter,
    F10: MultiplierType.Letter,
    J10: MultiplierType.Letter,
    N10: MultiplierType.Letter,
    F14: MultiplierType.Letter,
    J14: MultiplierType.Letter,
    // Double letters
    D1: MultiplierType.Letter,
    L1: MultiplierType.Letter,
    G3: MultiplierType.Letter,
    I3: MultiplierType.Letter,
    A4: MultiplierType.Letter,
    H4: MultiplierType.Letter,
    O4: MultiplierType.Letter,
    C7: MultiplierType.Letter,
    G7: MultiplierType.Letter,
    I7: MultiplierType.Letter,
    M7: MultiplierType.Letter,
    D8: MultiplierType.Letter,
    L8: MultiplierType.Letter,
    C9: MultiplierType.Letter,
    G9: MultiplierType.Letter,
    I9: MultiplierType.Letter,
    M9: MultiplierType.Letter,
    A12: MultiplierType.Letter,
    H12: MultiplierType.Letter,
    O12: MultiplierType.Letter,
    G13: MultiplierType.Letter,
    I13: MultiplierType.Letter,
    D15: MultiplierType.Letter,
    L15: MultiplierType.Letter,
};
