import { ISquare } from "../interfaces/isquare";
import { coordinateChars } from "../constants";

export function parseSquareCoordinates(square: ISquare): [number, number] {
    const xPart = square.id.charAt(0); // e.g. "A"
    const yPart = square.id.substr(1); // e.g. "11"
    return [coordinateChars.indexOf(xPart), parseInt(yPart, 10) - 1];
}
