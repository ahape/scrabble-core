import { Letter } from "../enums/letter";

const lowerCaseRx = /[a-z]/;

export function parseLetter(letter: string): Letter {
    if (lowerCaseRx.test(letter)) return Letter.BLANK;
    return letter as Letter;
}
