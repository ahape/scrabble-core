import * as _ from "underscore";
import * as ko from "knockout";
import { ISquare } from "../interfaces/isquare";
import { IMove } from "../interfaces/imove";
import { IGameState } from "../interfaces/igamestate";
import { IGameStatus } from "../interfaces/igamestatus";
import { Letter } from "../enums/letter";
import { ActionType } from "../enums/actiontype";
import { parsePlayCommand } from "../functions/parseplaycommand";
import { playMove } from "../functions/playmove";
import { printBoard } from "../functions/printboard";
import { parseLetter } from "../functions/parseletter";
import { getNextTurn } from "../functions/getnextturn";
import { getTurnFromActions } from "../functions/getturnfromactions";
import { getScoresFromActions } from "../functions/getscoresfromactions";
import { getMoveLogFromActions } from "../functions/getmovelogfromactions";
import { parseAction } from "../functions/parseaction";
import { createBoardFromActions } from "../functions/createboardfromactions";
import { createBagFromActions } from "../functions/createbagfromactions";
import { playCommandHasLettersFromRack } from "../functions/playcommandhaslettersfromrack";
import { createRackFromActions } from "../functions/createrackfromactions";
import { createRacksFromActions } from "../functions/createracksfromactions";
import { MAX_RACK_TILES } from "../constants";
import { Bag } from "./bag";
import { Rack } from "./rack";

export class Game {
    public id: string = _.now().toString(36);
    public teams: number = 2;
    /** Raw action strings */
    public actions: string[] = [];
    public actionIndex: number = -1;
    public currentState: KnockoutObservable<IGameState>;
    public currentStatus: KnockoutObservable<IGameStatus>;

    public constructor(gameJson?: IGameState) {
        if (gameJson) {
            this.id = gameJson.id;
            this.teams = gameJson.teams;
            this.actions = gameJson.actions;
            this.actionIndex = gameJson.actionIndex;
        }

        this.currentState = ko.observable(this.snapshot());
        this.currentStatus = ko.observable(this.status());

        if (!gameJson) {
            this._handleAction(ActionType.NewGame);
        }
    }

    public snapshot(actionIndex: number = this.actionIndex): IGameState {
        return {
            id: this.id,
            teams: this.teams,
            actions: this.actions,
            actionIndex,
        };
    }

    public status(actionIndex: number = this.actionIndex): IGameStatus {
        return this._getStatusFromActionIndex(actionIndex);
    }

    public draw(): void {
        const drawn = this._draw();
        if (drawn.length > 0) {
            this._handleAction(
                ActionType.Draw,
                ActionType.Draw + " " + drawn.join("")
            );
        }
    }

    public skip(): void {
        this._handleAction(ActionType.Skip);

        if (!this._canGameContinue()) this._handleAction(ActionType.EndGame);
    }

    public swap(actionRaw: string): void {
        actionRaw = this._swap(actionRaw);
        this._handleAction(ActionType.Swap, actionRaw);
    }

    public play(actionRaw: string): void {
        const command = parseAction(actionRaw)[1];
        const errorMessage = this._play(command);
        if (errorMessage) {
            // Check for if we are in the browser v. node
            if (typeof process !== "undefined") {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log("!!!! Error: " + errorMessage);
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            } else {
                alert(errorMessage);
            }
        } else this._handleAction(ActionType.Play, actionRaw);

        if (!this._canGameContinue()) this._handleAction(ActionType.EndGame);
    }

    public undo(): void {
        this._handleAction(ActionType.Undo);
    }

    public redo(): void {
        this._handleAction(ActionType.Redo);
    }

    public print(): void {
        console.log(`Tiles remaining in bag ` + this._bag().print());
        console.log(printBoard(this.board()));
        this.actions.forEach((action, i) => {
            if (i === this.actionIndex) action += " <<<";
            console.log(i + 1 + ". " + action);
        });
        console.log(`It's team ${this._teamTurn()}'s turn`);
        console.log(`Current letters: ` + this._teamTurnRack().print());
    }

    public load(gameJson: IGameState): void {
        this.id = gameJson.id;
        this.teams = gameJson.teams;
        this.actions = gameJson.actions;
        this.actionIndex = gameJson.actionIndex;

        this.currentState(this.snapshot());
        this.currentStatus(this.status());
    }

    public board(): ISquare[][] {
        return createBoardFromActions(this._nonFutureActions());
    }

    public canDraw(): boolean {
        const status = this.status();
        const rack = status.racks[status.teamTurn - 1];
        return status.bag.length > 0 && rack.length < MAX_RACK_TILES;
    }

    public canSwap(): boolean {
        const status = this.status();
        const rack = status.racks[status.teamTurn - 1];
        return status.bag.length > 0 && rack.length > 0;
    }

    public canUndo(): boolean {
        return Math.max(this.actionIndex - 1, 0) < this.actionIndex;
    }

    public canRedo(): boolean {
        return (
            Math.min(this.actionIndex + 1, this.actions.length - 1) >
            this.actionIndex
        );
    }

    private _getStatusFromActionIndex(actionIndex: number): IGameStatus {
        const teams = this.teams;
        const actions = this.actions.slice(0, actionIndex + 1);
        const bag = createBagFromActions(actions);
        const board = createBoardFromActions(actions);
        const racks = createRacksFromActions(actions, teams);
        const scores = getScoresFromActions(actions, teams);
        const teamTurn = getTurnFromActions(actions, teams);
        const moveLog = getMoveLogFromActions(actions, teams);
        const gameOver = this.actions.includes(ActionType.EndGame);

        return {
            bag: bag.toJSON(),
            board: board.map((row) =>
                row.map((sq) => sq.blankLetter || sq.letter)
            ),
            racks: racks.map((r) => r.toJSON()),
            scores,
            teamTurn,
            moveLog,
            gameOver,
        };
    }

    private _handleAction(actionType: ActionType, actionRaw?: string): void {
        switch (actionType) {
            case ActionType.NewGame:
            case ActionType.Draw:
            case ActionType.Skip:
            case ActionType.Swap:
            case ActionType.Play:
            case ActionType.EndGame:
                if (actionType !== ActionType.EndGame && !this._canGameContinue())
                    return;
                // In order to overwrite any previous states (after undo)
                this.actions.length = this.actionIndex + 1;
                this.actions.push(actionRaw || actionType);
                this.actionIndex++;
                break;
            case ActionType.Undo:
                this.actionIndex = Math.max(this.actionIndex - 1, 0);
                break;
            case ActionType.Redo:
                this.actionIndex = Math.min(
                    this.actionIndex + 1,
                    this.actions.length - 1
                );
                break;
        }

        this.currentState(this.snapshot());
        this.currentStatus(this.status());
    }

    private _nonFutureActions(): string[] {
        return this.actions.slice(0, this.actionIndex + 1);
    }

    private _bag(): Bag {
        return createBagFromActions(this._nonFutureActions());
    }

    private _teamTurn(): number {
        return getTurnFromActions(this._nonFutureActions(), this.teams);
    }

    private _teamTurnRack(): Rack {
        return createRackFromActions(this._nonFutureActions(), this.teams);
    }

    private _teamPreviousRack(): Rack {
        return createRacksFromActions(this._nonFutureActions(), this.teams)[
            getNextTurn(this.teams, this._teamTurn(), true) - 1
        ];
    }

    private _draw(): Letter[] {
        const rack = this._teamTurnRack();
        const drawn = this._bag().draw(rack.needs());
        rack.add(drawn);
        return drawn;
    }

    /** @returns raw action containing drawn letters as well as exchanged letters */
    private _swap(actionRaw: string): string {
        const letters = parseAction(actionRaw)[1].split("").map(parseLetter);
        const rack = this._teamTurnRack();
        const uniqRackLetters = _.unique(rack.letters);
        const uniqSwapLetters = _.unique(letters);
        if (
            letters.length > MAX_RACK_TILES ||
            // Check if the player is attempting to swap letters they don't have.
            _.intersection(uniqRackLetters, uniqSwapLetters).length !=
                uniqSwapLetters.length
        ) {
            throw new Error("You're trying to swap letters you don't have");
        }
        const bag = this._bag();
        // Prevent swapping for more than is in the bag.
        if (letters.length > bag.count()) letters.length = bag.count();
        rack.remove(letters);
        const newLetters = bag.swap(letters);
        rack.add(newLetters);
        return `${ActionType.Swap} ${letters.join("")} ${newLetters.join("")}`;
    }

    private _play(command: string): string {
        let move: IMove;

        try {
            move = parsePlayCommand(command);
        } catch (err) {
            return err.message;
        }
        const rack = this._teamTurnRack();
        // Simple check
        const isValid = playCommandHasLettersFromRack(move, rack.letters);

        if (!isValid) return "Word doesn't use letters from rack (1)";

        const result = playMove(move, this.board());
        const owned = rack.letters.slice();
        const used = result.usedLetters.slice();

        let letter: Letter | undefined;
        while ((letter = used.pop())) {
            const i = owned.indexOf(letter);
            if (i === -1) return "Word doesn't use letters from rack (2)";
            owned.splice(i, 1);
        }

        return "";
    }

    private _canGameContinue(): boolean {
        const actions = this._nonFutureActions();
        const racks = createRacksFromActions(
            this._nonFutureActions(),
            this.teams
        );

        let oopsLoops = 100;
        const consecutiveSkips = [];
        do {
            const lastAction = actions.pop();
            if (lastAction && lastAction == ActionType.Skip)
                consecutiveSkips.push(lastAction);
            else break;
        } while (oopsLoops--);

        if (oopsLoops === 0) throw new Error("Infinite loop encountered");

        // IF the bag is empty AND at least one rack is empty
        // OR IF there have been 3 rounds of consecutive skips
        // THEN the game cannot continue
        return !(
            (this._bag().isEmpty() && racks.some((r) => r.isEmpty())) ||
            consecutiveSkips.length / this.teams >= 3
        );
    }
}
