import * as _ from "underscore";
import { Letter } from "../enums/letter";
import { letterValueMap, startingBagLetters } from "../constants";

export class Bag {
    public letters: Letter[];

    public constructor() {
        this.letters = startingBagLetters.slice();
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
