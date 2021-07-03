import { Letter } from "./letter";
import { Multiplier } from "./multiplier";
import { MultiplierType } from "./multipliertype";

export interface ISquare {
    id: string;
    letter: Letter;
    blankLetter: string;
    played: boolean;
    multiplier: Multiplier;
    multiplierType: MultiplierType;
}
