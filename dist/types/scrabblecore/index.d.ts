/// <reference types="knockout" />
declare module "enums/letter" {
    export enum Letter {
        UNSET = "",
        BLANK = "?",
        A = "A",
        B = "B",
        C = "C",
        D = "D",
        E = "E",
        F = "F",
        G = "G",
        H = "H",
        I = "I",
        J = "J",
        K = "K",
        L = "L",
        M = "M",
        N = "N",
        O = "O",
        P = "P",
        Q = "Q",
        R = "R",
        S = "S",
        T = "T",
        U = "U",
        V = "V",
        W = "W",
        X = "X",
        Y = "Y",
        Z = "Z"
    }
}
declare module "enums/multiplier" {
    export enum Multiplier {
        None = 0,
        Single = 1,
        Double = 2,
        Triple = 3
    }
}
declare module "enums/multipliertype" {
    export enum MultiplierType {
        None = "",
        Letter = "letter",
        Word = "word"
    }
}
declare module "constants" {
    import { Letter } from "enums/letter";
    import { Multiplier } from "enums/multiplier";
    import { MultiplierType } from "enums/multipliertype";
    export const MAX_RACK_TILES = 7;
    export const BOARD_X_LENGTH = 15;
    export const BOARD_Y_LENGTH = 15;
    export const coordinateChars = "ABCDEFGHIJKLMNO";
    export const emptyBoard = "\n   A B C D E F G H I J K L M N O\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 1| | | | | | | | | | | | | | | |0\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 2| | | | | | | | | | | | | | | |1\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 3| | | | | | | | | | | | | | | |2\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 4| | | | | | | | | | | | | | | |3\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 5| | | | | | | | | | | | | | | |4\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 6| | | | | | | | | | | | | | | |5\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 7| | | | | | | | | | | | | | | |6\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 8| | | | | | | | | | | | | | | |7\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 9| | | | | | | | | | | | | | | |8\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n10| | | | | | | | | | | | | | | |9\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n11| | | | | | | | | | | | | | | |10\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n12| | | | | | | | | | | | | | | |11\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n13| | | | | | | | | | | | | | | |12\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n14| | | | | | | | | | | | | | | |13\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n15| | | | | | | | | | | | | | | |14\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4\n";
    export const startingBagLetters: Letter[];
    export const letterValueMap: {
        [key in Letter]: number;
    };
    export const coordinatesToMultiplier: Record<string, Multiplier>;
    export const coordinatesToMultiplierType: Record<string, MultiplierType>;
}
declare module "classes/bag" {
    import { Letter } from "enums/letter";
    export class Bag {
        letters: Letter[];
        constructor();
        count(): number;
        draw(count: number): Letter[];
        swap(letters: Letter[]): Letter[];
        remove(letters: Letter[]): void;
        add(letters: Letter[]): void;
        isEmpty(): boolean;
        totalPoints(): number;
        print(): string;
        toJSON(): string[];
    }
}
declare module "interfaces/isquare" {
    import { Letter } from "enums/letter";
    import { Multiplier } from "enums/multiplier";
    import { MultiplierType } from "enums/multipliertype";
    export interface ISquare {
        id: string;
        letter: Letter;
        blankLetter: string;
        played: boolean;
        multiplier: Multiplier;
        multiplierType: MultiplierType;
    }
}
declare module "interfaces/imove" {
    export interface IMove {
        x: number;
        y: number;
        isVertical: boolean;
        /** Raw character values, so that intended blank letter is known */
        letters: string[];
        id: string;
    }
}
declare module "interfaces/igamestate" {
    export interface IGameState {
        id: string;
        teams: number;
        actions: string[];
        actionIndex: number;
    }
}
declare module "interfaces/igamestatus" {
    export interface IGameStatus {
        bag: string[];
        board: string[][];
        racks: string[][];
        teamTurn: number;
        scores: number[];
        moveLog: string[];
        gameOver: boolean;
    }
}
declare module "enums/actiontype" {
    export enum ActionType {
        Play = "PLAY",
        Skip = "SKIP",
        Swap = "SWAP",
        Draw = "DRAW",
        /** Doesn't get added to `actions` array */
        Undo = "UNDO",
        /** Doesn't get added to `actions` array */
        Redo = "REDO",
        NewGame = "NEW_GAME",
        EndGame = "GAME_OVER"
    }
}
declare module "functions/parseplaycommand" {
    import { IMove } from "interfaces/imove";
    export function parsePlayCommand(playCommand: string): IMove;
}
declare module "interfaces/iplayedword" {
    export interface IPlayedWord {
        points: number;
        word: string;
    }
}
declare module "interfaces/iplayresult" {
    import { IPlayedWord } from "interfaces/iplayedword";
    import { ISquare } from "interfaces/isquare";
    import { Letter } from "enums/letter";
    export interface IPlayResult {
        /** All of the words that contribute to the move's score. */
        words: IPlayedWord[];
        /** The new state of the board. */
        board: ISquare[][];
        /** Letters used from rack */
        usedLetters: Letter[];
    }
}
declare module "functions/parseletter" {
    import { Letter } from "enums/letter";
    export function parseLetter(letter: string): Letter;
}
declare module "functions/getpointsfromsquare" {
    import { ISquare } from "interfaces/isquare";
    /**
     * Returns points for a letter played on a square.
     * In the case of a square representing a word-multiplier,
     * the multiplier is added to the `multipliers` argument for
     * later evaluation.
     */
    export function getPointsFromSquare(sq: ISquare, multipliers: number[]): number;
}
declare module "functions/playmove" {
    import { ISquare } from "interfaces/isquare";
    import { IMove } from "interfaces/imove";
    import { IPlayResult } from "interfaces/iplayresult";
    export function playMove(move: IMove, board: ISquare[][]): IPlayResult;
}
declare module "functions/printboard" {
    import { ISquare } from "interfaces/isquare";
    export function printBoard(board: ISquare[][]): string;
}
declare module "functions/getnextturn" {
    export function getNextTurn(teams: number, teamTurn: number, oppositeDirection: boolean): number;
}
declare module "functions/parseaction" {
    import { ActionType } from "enums/actiontype";
    export function parseAction(rawAction: string): [ActionType, string];
}
declare module "functions/actionchangesturn" {
    import { ActionType } from "enums/actiontype";
    export function actionChangesTurn(actionType: ActionType): boolean;
}
declare module "functions/getturnfromactions" {
    export function getTurnFromActions(actions: string[], teams: number): number;
}
declare module "functions/parseboard" {
    import { ISquare } from "interfaces/isquare";
    export function parseBoard(board: string): ISquare[][];
}
declare module "functions/createnewboard" {
    import { ISquare } from "interfaces/isquare";
    export function createNewBoard(): ISquare[][];
}
declare module "classes/rack" {
    import { Letter } from "enums/letter";
    export class Rack {
        letters: Letter[];
        count(): number;
        needs(): number;
        add(letters: Letter[]): void;
        remove(letters: Letter[]): void;
        totalPoints(): number;
        isEmpty(): boolean;
        print(): string;
        toJSON(): string[];
    }
}
declare module "functions/createracksfromactions" {
    import { Rack } from "classes/rack";
    export function createRacksFromActions(rawActions: string[], teams: number): Rack[];
}
declare module "functions/getscoresfromactions" {
    export function getScoresFromActions(rawActions: string[], teams: number): number[];
}
declare module "functions/getmovelogfromactions" {
    export function getMoveLogFromActions(rawActions: string[], teams: number): string[];
}
declare module "functions/createboardfromactions" {
    import { ISquare } from "interfaces/isquare";
    export function createBoardFromActions(actions: string[]): ISquare[][];
}
declare module "functions/createbagfromactions" {
    import { Bag } from "classes/bag";
    export function createBagFromActions(actions: string[]): Bag;
}
declare module "functions/playcommandhaslettersfromrack" {
    import { IMove } from "interfaces/imove";
    import { Letter } from "enums/letter";
    /**
     * Makes sure that at least one of the rack's tiles is in the move.
     */
    export function playCommandHasLettersFromRack(move: IMove, letters: Letter[]): boolean;
}
declare module "functions/createrackfromactions" {
    import { Rack } from "classes/rack";
    export function createRackFromActions(rawActions: string[], teams: number): Rack;
}
declare module "classes/game" {
    import { ISquare } from "interfaces/isquare";
    import { IGameState } from "interfaces/igamestate";
    import { IGameStatus } from "interfaces/igamestatus";
    export class Game {
        id: string;
        teams: number;
        /** Raw action strings */
        actions: string[];
        actionIndex: number;
        currentState: KnockoutObservable<IGameState>;
        currentStatus: KnockoutObservable<IGameStatus>;
        constructor(gameJson?: IGameState);
        snapshot(actionIndex?: number): IGameState;
        status(actionIndex?: number): IGameStatus;
        draw(): void;
        skip(): void;
        swap(actionRaw: string): void;
        play(actionRaw: string): void;
        undo(): void;
        redo(): void;
        print(): void;
        load(gameJson: IGameState): void;
        board(): ISquare[][];
        canDraw(): boolean;
        canSwap(): boolean;
        canUndo(): boolean;
        canRedo(): boolean;
        private _getStatusFromActionIndex;
        private _handleAction;
        private _nonFutureActions;
        private _bag;
        private _teamTurn;
        private _teamTurnRack;
        private _teamPreviousRack;
        private _draw;
        /** @returns raw action containing drawn letters as well as exchanged letters */
        private _swap;
        private _play;
        private _canGameContinue;
    }
}
declare module "functions/parsesquarecoordinates" {
    import { ISquare } from "interfaces/isquare";
    export function parseSquareCoordinates(square: ISquare): [number, number];
}
declare module "functions/createplaycommand" {
    import { ISquare } from "interfaces/isquare";
    /**
     * This function is for a UI implementation to create a play command.
     * It is expected that the UI context would only have knowledge of the letters
     * being played, and the letters on the board.
     * From that, we have to determine what the official "move" is.
     * @param {ISquare[]} move - ONLY consists of squares from "rack".
     * @param {ISquare[][]} board - ONLY consists of squares from "board" (and not `move`).
     */
    export function createPlayCommand(move: ISquare[], board: ISquare[][]): string;
}
declare module "functions/createboardfromstatus" {
    import { IGameStatus } from "interfaces/igamestatus";
    import { ISquare } from "interfaces/isquare";
    export function createBoardFromStatus(status: IGameStatus): ISquare[][];
}
declare module "scrabblecore" {
    export * as constants from "constants";
    export { Bag } from "classes/bag";
    export { Game } from "classes/game";
    export { Rack } from "classes/rack";
    export { ActionType } from "enums/actiontype";
    export { Letter } from "enums/letter";
    export { Multiplier } from "enums/multiplier";
    export { MultiplierType } from "enums/multipliertype";
    export { actionChangesTurn } from "functions/actionchangesturn";
    export { createBagFromActions } from "functions/createbagfromactions";
    export { createBoardFromActions } from "functions/createboardfromactions";
    export { createNewBoard } from "functions/createnewboard";
    export { createPlayCommand } from "functions/createplaycommand";
    export { createRackFromActions } from "functions/createrackfromactions";
    export { createRacksFromActions } from "functions/createracksfromactions";
    export { getMoveLogFromActions } from "functions/getmovelogfromactions";
    export { getNextTurn } from "functions/getnextturn";
    export { getPointsFromSquare } from "functions/getpointsfromsquare";
    export { getScoresFromActions } from "functions/getscoresfromactions";
    export { getTurnFromActions } from "functions/getturnfromactions";
    export { parseAction } from "functions/parseaction";
    export { parseBoard } from "functions/parseboard";
    export { parseLetter } from "functions/parseletter";
    export { parsePlayCommand } from "functions/parseplaycommand";
    export { parseSquareCoordinates } from "functions/parsesquarecoordinates";
    export { playCommandHasLettersFromRack } from "functions/playcommandhaslettersfromrack";
    export { playMove } from "functions/playmove";
    export { printBoard } from "functions/printboard";
    export { createBoardFromStatus } from "functions/createboardfromstatus";
    export { IGameState } from "interfaces/igamestate";
    export { IGameStatus } from "interfaces/igamestatus";
    export { IMove } from "interfaces/imove";
    export { IPlayedWord } from "interfaces/iplayedword";
    export { IPlayResult } from "interfaces/iplayresult";
    export { ISquare } from "interfaces/isquare";
}
