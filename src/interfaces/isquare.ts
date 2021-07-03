import { Letter } from "../enums/letter";
import { Multiplier } from "../enums/multiplier";
import { MultiplierType } from "../enums/multipliertype";

export interface ISquare {
    id: string;
    letter: Letter;
    blankLetter: string;
    played: boolean;
    multiplier: Multiplier;
    multiplierType: MultiplierType;
}
