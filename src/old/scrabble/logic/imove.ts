import { Letter } from "./letter";

export interface IMove {
    x: number;
    y: number;
    isVertical: boolean;
    /** Raw character values, so that intended blank letter is known */
    letters: string[];
    id: string;
}
