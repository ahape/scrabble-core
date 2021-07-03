import * as _ from "underscore";
import { Letter } from "./logic/letter";
import { letterValueMap } from "./logic/lettervaluemap";

export class Bag {
    public letters: Letter[];

    public constructor() {
        this.letters = _.flatten([
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
    }

    public count(): number {
        return this.letters.length;
    }

    public draw(count: number): Letter[] {
        this.letters = _.shuffle(this.letters);
        return this.letters.splice(0, count);
    }

    public swap(letters: Letter[]): Letter[] {
        const drawn = this.draw(letters.length);

        // Ensure we can't receive more than we give (end of game scenario).
        this.add(letters.slice(0, drawn.length));
        // If attempting to exchange for more than is possible, give
        // them back their extra letters.
        if (letters.length > drawn.length)
            return drawn.concat(letters.slice(drawn.length));
        return drawn;
    }

    public remove(letters: Letter[]): void {
        letters.forEach((letter) => {
            const index = this.letters.indexOf(letter);
            if (index > -1) this.letters.splice(index, 1);
        });
    }

    public add(letters: Letter[]): void {
        this.letters.push(...letters);
    }

    public isEmpty(): boolean {
        return this.letters.length === 0;
    }

    public totalPoints(): number {
        return this.letters.reduce((sum, c) => sum + letterValueMap[c], 0);
    }

    public print(): string {
        return (
            `(${this.count()}) ` +
            JSON.stringify(_.countBy(this.letters.sort())).slice(1, -1)
        );
    }

    public toJSON(): string[] {
        return this.letters.slice();
    }
}
