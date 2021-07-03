import { startingBagLetters } from "../src/constants";
import { Letter } from "../src/enums/letter";
import { createBagFromActions } from "../src/functions/createbagfromactions";
import { createPlayCommand } from "../src/functions/createplaycommand";
import { createNewBoard } from "../src/functions/createnewboard";
import { layout001 } from "./data/boards/layout001";

describe("createBagFromActions", () => {
    function just(letter: Letter) {
        return (x: Letter) => x === letter;
    }

    it("doesn't care about actions that don't affect the bag", () => {
        const actions = ["NEW_GAME", "PLAY WoRD h8v", "SKIP"];

        const bag = createBagFromActions(actions);

        console.assert(bag.count() === startingBagLetters.length);
    });

    it("removes drawn letters from bag (singles)", () => {
        const actions = ["DRAW ZQXKJ"];

        const bag = createBagFromActions(actions);

        console.assert(
            !bag.letters.includes(Letter.Z) &&
                !bag.letters.includes(Letter.X) &&
                !bag.letters.includes(Letter.K) &&
                !bag.letters.includes(Letter.Q) &&
                !bag.letters.includes(Letter.J)
        );
    });

    it("removes drawn letters from bag (multiples)", () => {
        const actions = ["DRAW EEEEEEE"];
        const totalEs = startingBagLetters.filter(just(Letter.E)).length;

        const bag = createBagFromActions(actions);

        console.assert(
            bag.letters.filter(just(Letter.E)).length === totalEs - 7
        );
    });

    it("removes drawn letters from bag (blanks)", () => {
        const actions = ["DRAW ??"];
        const totalBlanks = startingBagLetters.filter(just(Letter.BLANK))
            .length;

        const bag = createBagFromActions(actions);

        console.assert(
            bag.letters.filter(just(Letter.BLANK)).length === totalBlanks - 2
        );
    });
});

// TODO: Do this once you have CLI working.
describe("createBoardFromActions", () => {});

describe("createPlayCommand", () => {
    it("throws error if played letters on not in same row/col", () => {
        const board = createNewBoard();
        const move = [board[1][1], board[2][2]];

        for (let i = 0; i < move.length; i++) move[i].letter = Letter.A;

        let errorMessage = "";
        try {
            createPlayCommand(move, board);
        } catch (err) {
            errorMessage = err.message;
        }

        console.assert(errorMessage !== "");
    });

    it("throws error if there are empty squares in between played letters - x", () => {
        const board = createNewBoard();
        const move = [board[1][1], board[1][3]];

        for (let i = 0; i < move.length; i++) move[i].letter = Letter.A;

        let errorMessage = "";
        try {
            createPlayCommand(move, board);
        } catch (err) {
            errorMessage = err.message;
        }

        console.assert(errorMessage !== "");
    });

    it("throws error if there are empty squares in between played letters - y", () => {
        const board = createNewBoard();
        const move = [board[1][1], board[3][1]];

        for (let i = 0; i < move.length; i++) move[i].letter = Letter.A;

        let errorMessage = "";
        try {
            createPlayCommand(move, board);
        } catch (err) {
            errorMessage = err.message;
        }

        console.assert(errorMessage !== "");
    });

    it("throws error if there are empty squares in between played letters and letters on board - y", () => {
        const board = createNewBoard();
        const played = board[2][1];
        played.played = true;
        played.letter = Letter.B;
        const move = [board[1][1], board[4][1]];

        for (let i = 0; i < move.length; i++) move[i].letter = Letter.A;

        let errorMessage = "";
        try {
            createPlayCommand(move, board);
        } catch (err) {
            errorMessage = err.message;
        }

        console.assert(errorMessage !== "");
    });

    it("returns the correct command - x", () => {
        const board = createNewBoard();
        const move = [board[1][1], board[1][2]];
        const letters = [Letter.A, Letter.B];
        for (let i = 0; i < move.length; i++) move[i].letter = letters[i];

        const cmd = createPlayCommand(move, board);

        console.assert(cmd == "AB B2 H");
    });

    it("returns the correct command - y", () => {
        const board = createNewBoard();
        const move = [board[1][1], board[2][1]];
        const letters = [Letter.A, Letter.B];
        for (let i = 0; i < move.length; i++) move[i].letter = letters[i];

        const cmd = createPlayCommand(move, board);

        console.assert(cmd == "AB B2 V");
    });
});
