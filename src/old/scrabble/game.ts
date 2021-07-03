import * as _ from "underscore";
import * as ko from "knockout";
import { ISquare } from "./logic/isquare";
import { IPlayResult } from "./logic/iplayresult";
import { IMove } from "./logic/imove";
import { Letter } from "./logic/letter";
import { parsePlayCommand } from "./logic/parseplaycommand";
import { createNewBoard } from "./logic/createnewboard";
import { playMove } from "./logic/playmove";
import { printBoard } from "./logic/printboard";
import { parseLetter } from "./logic/parseletter";
import { ActionType } from "./logic/actiontype";
import { actionChangesTurn } from "./logic/actionchangesturn";
import { getNextTurn } from "./logic/getnextturn";
import { getTurnFromActions } from "./logic/getturnfromactions";
import { getScoresFromActions } from "./logic/getscoresfromactions";
import { getMoveLogFromActions } from "./logic/getmovelogfromactions";
import { parseAction } from "./logic/parseaction";
import { createBoardFromActions } from "./logic/createboardfromactions";
import { createBagFromActions } from "./logic/createbagfromactions";
import { playCommandHasLettersFromRack } from "./logic/playcommandhaslettersfromrack";
import { createRackFromActions } from "./logic/createrackfromactions";
import { createRacksFromActions } from "./logic/createracksfromactions";
import {
    MAX_RACK_TILES,
    BOARD_X_LENGTH,
    BOARD_Y_LENGTH,
} from "./logic/constants";
import { Bag } from "./bag";
import { Rack } from "./rack";
import { IGameState } from "./igamestate";
import { IGameStatus } from "./igamestatus";

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

    public snapshot(): IGameState {
        return {
            id: this.id,
            teams: this.teams,
            actions: this.actions,
            actionIndex: this.actionIndex,
        };
    }

    public status(): IGameStatus {
        return {
            bag: this._bag().toJSON(),
            board: this._board().map((row) =>
                row.map((sq) => sq.blankLetter || sq.letter)
            ),
            racks: createRacksFromActions(
                this._nonFutureActions(),
                this.teams
            ).map((r) => r.toJSON()),
            scores: getScoresFromActions(this._nonFutureActions(), this.teams),
            teamTurn: this._teamTurn(),
            moveLog: getMoveLogFromActions(
                this._nonFutureActions(),
                this.teams
            ),
            gameOver:
                parseAction(this.actions[this.actionIndex])[0] ==
                ActionType.EndGame,
        };
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

        if (!this._canGameContinue()) {
            this._handleAction(
                ActionType.EndGame,
                ActionType.EndGame + " " + this._bag().totalPoints()
            );
        }
    }

    public undo(): void {
        this._handleAction(ActionType.Undo);
    }

    public redo(): void {
        this._handleAction(ActionType.Redo);
    }

    public print(): void {
        console.log(`Tiles remaining in bag ` + this._bag().print());
        console.log(printBoard(this._board()));
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

    private _handleAction(actionType: ActionType, actionRaw?: string): void {
        switch (actionType) {
            case ActionType.NewGame:
            case ActionType.Draw:
            case ActionType.Skip:
            case ActionType.Swap:
            case ActionType.Play:
            case ActionType.EndGame:
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

    private _board(): ISquare[][] {
        return createBoardFromActions(this._nonFutureActions());
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

        try {
            const result = playMove(move, this._board());
            const owned = rack.letters.slice();
            const used = result.usedLetters.slice();

            let letter: Letter | undefined;
            while ((letter = used.pop())) {
                var i = owned.indexOf(letter);
                if (i === -1) return "Word doesn't use letters from rack (2)";
                owned.splice(i, 1);
            }

            return "";
        } catch (err) {
            throw err;
            //return err.message;
        }
    }

    private _canGameContinue(): boolean {
        const previousTurnRackIndex =
            getNextTurn(this.teams, this._teamTurn(), true) - 1;
        const otherTeamsRacks = createRacksFromActions(
            this._nonFutureActions(),
            this.teams
        );

        otherTeamsRacks.splice(previousTurnRackIndex, 1);

        const otherTeamsRackNeeds = otherTeamsRacks.reduce(
            (sum, c) => sum + c.needs(),
            0
        );

        if (
            // IF the team who just went played all of their tiles
            this._teamPreviousRack().isEmpty() &&
            // AND the bag is empty
            // OR the team who just went won't get a chance to draw again
            (this._bag().isEmpty() || this._bag().count() < otherTeamsRackNeeds)
        )
            return false;
        return true;
    }
}
