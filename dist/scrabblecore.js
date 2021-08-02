define("scrabblecore", ["knockout","underscore"], (__WEBPACK_EXTERNAL_MODULE_knockout__, __WEBPACK_EXTERNAL_MODULE_underscore__) => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/bag.ts":
/*!****************************!*\
  !*** ./src/classes/bag.ts ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! underscore */ "underscore"), __webpack_require__(/*! ../constants */ "./src/constants.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Bag = void 0;
    _ = __importStar(_);
    var Bag = /** @class */ (function () {
        function Bag() {
            this.letters = constants_1.startingBagLetters.slice();
        }
        Bag.prototype.count = function () {
            return this.letters.length;
        };
        Bag.prototype.draw = function (count) {
            this.letters = _.shuffle(this.letters);
            return this.letters.splice(0, count);
        };
        Bag.prototype.swap = function (letters) {
            var drawn = this.draw(letters.length);
            // Ensure we can't receive more than we give (end of game scenario).
            this.add(letters.slice(0, drawn.length));
            // If attempting to exchange for more than is possible, give
            // them back their extra letters.
            if (letters.length > drawn.length)
                return drawn.concat(letters.slice(drawn.length));
            return drawn;
        };
        Bag.prototype.remove = function (letters) {
            var _this = this;
            letters.forEach(function (letter) {
                var index = _this.letters.indexOf(letter);
                if (index > -1)
                    _this.letters.splice(index, 1);
            });
        };
        Bag.prototype.add = function (letters) {
            var _a;
            (_a = this.letters).push.apply(_a, letters);
        };
        Bag.prototype.isEmpty = function () {
            return this.letters.length === 0;
        };
        Bag.prototype.totalPoints = function () {
            return this.letters.reduce(function (sum, c) { return sum + constants_1.letterValueMap[c]; }, 0);
        };
        Bag.prototype.print = function () {
            return ("(" + this.count() + ") " +
                JSON.stringify(_.countBy(this.letters.sort())).slice(1, -1));
        };
        Bag.prototype.toJSON = function () {
            return this.letters.slice();
        };
        return Bag;
    }());
    exports.Bag = Bag;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/classes/game.ts":
/*!*****************************!*\
  !*** ./src/classes/game.ts ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! underscore */ "underscore"), __webpack_require__(/*! knockout */ "knockout"), __webpack_require__(/*! ../enums/actiontype */ "./src/enums/actiontype.ts"), __webpack_require__(/*! ../functions/parseplaycommand */ "./src/functions/parseplaycommand.ts"), __webpack_require__(/*! ../functions/playmove */ "./src/functions/playmove.ts"), __webpack_require__(/*! ../functions/printboard */ "./src/functions/printboard.ts"), __webpack_require__(/*! ../functions/parseletter */ "./src/functions/parseletter.ts"), __webpack_require__(/*! ../functions/getnextturn */ "./src/functions/getnextturn.ts"), __webpack_require__(/*! ../functions/getturnfromactions */ "./src/functions/getturnfromactions.ts"), __webpack_require__(/*! ../functions/getscoresfromactions */ "./src/functions/getscoresfromactions.ts"), __webpack_require__(/*! ../functions/getmovelogfromactions */ "./src/functions/getmovelogfromactions.ts"), __webpack_require__(/*! ../functions/parseaction */ "./src/functions/parseaction.ts"), __webpack_require__(/*! ../functions/createboardfromactions */ "./src/functions/createboardfromactions.ts"), __webpack_require__(/*! ../functions/createbagfromactions */ "./src/functions/createbagfromactions.ts"), __webpack_require__(/*! ../functions/playcommandhaslettersfromrack */ "./src/functions/playcommandhaslettersfromrack.ts"), __webpack_require__(/*! ../functions/createrackfromactions */ "./src/functions/createrackfromactions.ts"), __webpack_require__(/*! ../functions/createracksfromactions */ "./src/functions/createracksfromactions.ts"), __webpack_require__(/*! ../constants */ "./src/constants.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _, ko, actiontype_1, parseplaycommand_1, playmove_1, printboard_1, parseletter_1, getnextturn_1, getturnfromactions_1, getscoresfromactions_1, getmovelogfromactions_1, parseaction_1, createboardfromactions_1, createbagfromactions_1, playcommandhaslettersfromrack_1, createrackfromactions_1, createracksfromactions_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Game = void 0;
    _ = __importStar(_);
    ko = __importStar(ko);
    var Game = /** @class */ (function () {
        function Game(gameJson) {
            this.id = _.now().toString(36);
            this.teams = 2;
            /** Raw action strings */
            this.actions = [];
            this.actionIndex = -1;
            if (gameJson) {
                this.id = gameJson.id;
                this.teams = gameJson.teams;
                this.actions = gameJson.actions;
                this.actionIndex = gameJson.actionIndex;
            }
            this.currentState = ko.observable(this.snapshot());
            this.currentStatus = ko.observable(this.status());
            if (!gameJson) {
                this._handleAction(actiontype_1.ActionType.NewGame);
            }
        }
        Game.prototype.snapshot = function (actionIndex) {
            if (actionIndex === void 0) { actionIndex = this.actionIndex; }
            return {
                id: this.id,
                teams: this.teams,
                actions: this.actions,
                actionIndex: actionIndex,
            };
        };
        Game.prototype.status = function (actionIndex) {
            if (actionIndex === void 0) { actionIndex = this.actionIndex; }
            return this._getStatusFromActionIndex(actionIndex);
        };
        Game.prototype.draw = function () {
            var drawn = this._draw();
            if (drawn.length > 0) {
                this._handleAction(actiontype_1.ActionType.Draw, actiontype_1.ActionType.Draw + " " + drawn.join(""));
            }
        };
        Game.prototype.skip = function () {
            this._handleAction(actiontype_1.ActionType.Skip);
            if (!this._canGameContinue())
                this._handleAction(actiontype_1.ActionType.EndGame);
        };
        Game.prototype.swap = function (actionRaw) {
            actionRaw = this._swap(actionRaw);
            this._handleAction(actiontype_1.ActionType.Swap, actionRaw);
        };
        Game.prototype.play = function (actionRaw) {
            var command = parseaction_1.parseAction(actionRaw)[1];
            var errorMessage = this._play(command);
            if (errorMessage) {
                // Check for if we are in the browser v. node
                if (typeof process !== "undefined") {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log("!!!! Error: " + errorMessage);
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                }
                else {
                    alert(errorMessage);
                }
            }
            else
                this._handleAction(actiontype_1.ActionType.Play, actionRaw);
            if (!this._canGameContinue())
                this._handleAction(actiontype_1.ActionType.EndGame);
        };
        Game.prototype.undo = function () {
            this._handleAction(actiontype_1.ActionType.Undo);
        };
        Game.prototype.redo = function () {
            this._handleAction(actiontype_1.ActionType.Redo);
        };
        Game.prototype.print = function () {
            var _this = this;
            console.log("Tiles remaining in bag " + this._bag().print());
            console.log(printboard_1.printBoard(this.board()));
            this.actions.forEach(function (action, i) {
                if (i === _this.actionIndex)
                    action += " <<<";
                console.log(i + 1 + ". " + action);
            });
            console.log("It's team " + this._teamTurn() + "'s turn");
            console.log("Current letters: " + this._teamTurnRack().print());
        };
        Game.prototype.load = function (gameJson) {
            this.id = gameJson.id;
            this.teams = gameJson.teams;
            this.actions = gameJson.actions;
            this.actionIndex = gameJson.actionIndex;
            this.currentState(this.snapshot());
            this.currentStatus(this.status());
        };
        Game.prototype.board = function () {
            return createboardfromactions_1.createBoardFromActions(this._nonFutureActions());
        };
        Game.prototype.canDraw = function () {
            var status = this.status();
            var rack = status.racks[status.teamTurn - 1];
            return status.bag.length > 0 && rack.length < constants_1.MAX_RACK_TILES;
        };
        Game.prototype.canSwap = function () {
            var status = this.status();
            var rack = status.racks[status.teamTurn - 1];
            return status.bag.length > 0 && rack.length > 0;
        };
        Game.prototype.canUndo = function () {
            return Math.max(this.actionIndex - 1, 0) < this.actionIndex;
        };
        Game.prototype.canRedo = function () {
            return (Math.min(this.actionIndex + 1, this.actions.length - 1) >
                this.actionIndex);
        };
        Game.prototype._getStatusFromActionIndex = function (actionIndex) {
            var teams = this.teams;
            var actions = this.actions.slice(0, actionIndex + 1);
            var bag = createbagfromactions_1.createBagFromActions(actions);
            var board = createboardfromactions_1.createBoardFromActions(actions);
            var racks = createracksfromactions_1.createRacksFromActions(actions, teams);
            var scores = getscoresfromactions_1.getScoresFromActions(actions, teams);
            var teamTurn = getturnfromactions_1.getTurnFromActions(actions, teams);
            var moveLog = getmovelogfromactions_1.getMoveLogFromActions(actions, teams);
            var gameOver = this.actions.includes(actiontype_1.ActionType.EndGame);
            return {
                bag: bag.toJSON(),
                board: board.map(function (row) {
                    return row.map(function (sq) { return sq.blankLetter || sq.letter; });
                }),
                racks: racks.map(function (r) { return r.toJSON(); }),
                scores: scores,
                teamTurn: teamTurn,
                moveLog: moveLog,
                gameOver: gameOver,
            };
        };
        Game.prototype._handleAction = function (actionType, actionRaw) {
            switch (actionType) {
                case actiontype_1.ActionType.NewGame:
                case actiontype_1.ActionType.Draw:
                case actiontype_1.ActionType.Skip:
                case actiontype_1.ActionType.Swap:
                case actiontype_1.ActionType.Play:
                case actiontype_1.ActionType.EndGame:
                    if (actionType !== actiontype_1.ActionType.EndGame && !this._canGameContinue())
                        return;
                    // In order to overwrite any previous states (after undo)
                    this.actions.length = this.actionIndex + 1;
                    this.actions.push(actionRaw || actionType);
                    this.actionIndex++;
                    break;
                case actiontype_1.ActionType.Undo:
                    this.actionIndex = Math.max(this.actionIndex - 1, 0);
                    break;
                case actiontype_1.ActionType.Redo:
                    this.actionIndex = Math.min(this.actionIndex + 1, this.actions.length - 1);
                    break;
            }
            this.currentState(this.snapshot());
            this.currentStatus(this.status());
        };
        Game.prototype._nonFutureActions = function () {
            return this.actions.slice(0, this.actionIndex + 1);
        };
        Game.prototype._bag = function () {
            return createbagfromactions_1.createBagFromActions(this._nonFutureActions());
        };
        Game.prototype._teamTurn = function () {
            return getturnfromactions_1.getTurnFromActions(this._nonFutureActions(), this.teams);
        };
        Game.prototype._teamTurnRack = function () {
            return createrackfromactions_1.createRackFromActions(this._nonFutureActions(), this.teams);
        };
        Game.prototype._teamPreviousRack = function () {
            return createracksfromactions_1.createRacksFromActions(this._nonFutureActions(), this.teams)[getnextturn_1.getNextTurn(this.teams, this._teamTurn(), true) - 1];
        };
        Game.prototype._draw = function () {
            var rack = this._teamTurnRack();
            var drawn = this._bag().draw(rack.needs());
            rack.add(drawn);
            return drawn;
        };
        /** @returns raw action containing drawn letters as well as exchanged letters */
        Game.prototype._swap = function (actionRaw) {
            var letters = parseaction_1.parseAction(actionRaw)[1].split("").map(parseletter_1.parseLetter);
            var rack = this._teamTurnRack();
            var uniqRackLetters = _.unique(rack.letters);
            var uniqSwapLetters = _.unique(letters);
            if (letters.length > constants_1.MAX_RACK_TILES ||
                // Check if the player is attempting to swap letters they don't have.
                _.intersection(uniqRackLetters, uniqSwapLetters).length !=
                    uniqSwapLetters.length) {
                throw new Error("You're trying to swap letters you don't have");
            }
            var bag = this._bag();
            // Prevent swapping for more than is in the bag.
            if (letters.length > bag.count())
                letters.length = bag.count();
            rack.remove(letters);
            var newLetters = bag.swap(letters);
            rack.add(newLetters);
            return actiontype_1.ActionType.Swap + " " + letters.join("") + " " + newLetters.join("");
        };
        Game.prototype._play = function (command) {
            var move;
            try {
                move = parseplaycommand_1.parsePlayCommand(command);
            }
            catch (err) {
                return err.message;
            }
            var rack = this._teamTurnRack();
            // Simple check
            var isValid = playcommandhaslettersfromrack_1.playCommandHasLettersFromRack(move, rack.letters);
            if (!isValid)
                return "Word doesn't use letters from rack (1)";
            var result = playmove_1.playMove(move, this.board());
            var owned = rack.letters.slice();
            var used = result.usedLetters.slice();
            var letter;
            while ((letter = used.pop())) {
                var i = owned.indexOf(letter);
                if (i === -1)
                    return "Word doesn't use letters from rack (2)";
                owned.splice(i, 1);
            }
            return "";
        };
        Game.prototype._canGameContinue = function () {
            var actions = this._nonFutureActions();
            var racks = createracksfromactions_1.createRacksFromActions(this._nonFutureActions(), this.teams);
            var oopsLoops = 100;
            var consecutiveSkips = [];
            do {
                var lastAction = actions.pop();
                if (lastAction && lastAction == actiontype_1.ActionType.Skip)
                    consecutiveSkips.push(lastAction);
                else
                    break;
            } while (oopsLoops--);
            if (oopsLoops === 0)
                throw new Error("Infinite loop encountered");
            // IF the bag is empty AND at least one rack is empty
            // OR IF there have been 3 rounds of consecutive skips
            // THEN the game cannot continue
            return !((this._bag().isEmpty() && racks.some(function (r) { return r.isEmpty(); })) ||
                consecutiveSkips.length / this.teams >= 3);
        };
        return Game;
    }());
    exports.Game = Game;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/classes/rack.ts":
/*!*****************************!*\
  !*** ./src/classes/rack.ts ***!
  \*****************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../constants */ "./src/constants.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Rack = void 0;
    var Rack = /** @class */ (function () {
        function Rack() {
            this.letters = [];
        }
        Rack.prototype.count = function () {
            return this.letters.length;
        };
        Rack.prototype.needs = function () {
            return constants_1.MAX_RACK_TILES - this.count();
        };
        Rack.prototype.add = function (letters) {
            for (var i = 0; i < letters.length && this.letters.length <= constants_1.MAX_RACK_TILES; i++)
                this.letters.push(letters[i]);
        };
        Rack.prototype.remove = function (letters) {
            for (var _i = 0, letters_1 = letters; _i < letters_1.length; _i++) {
                var letter = letters_1[_i];
                var existingIndex = this.letters.indexOf(letter);
                if (existingIndex > -1)
                    this.letters.splice(existingIndex, 1);
            }
        };
        Rack.prototype.totalPoints = function () {
            return this.letters.reduce(function (sum, c) { return sum + constants_1.letterValueMap[c]; }, 0);
        };
        Rack.prototype.isEmpty = function () {
            return this.letters.length === 0;
        };
        Rack.prototype.print = function () {
            return "[" + this.letters.join("") + "]";
        };
        Rack.prototype.toJSON = function () {
            return this.letters.slice();
        };
        return Rack;
    }());
    exports.Rack = Rack;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! underscore */ "underscore"), __webpack_require__(/*! ./enums/letter */ "./src/enums/letter.ts"), __webpack_require__(/*! ./enums/multiplier */ "./src/enums/multiplier.ts"), __webpack_require__(/*! ./enums/multipliertype */ "./src/enums/multipliertype.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _, letter_1, multiplier_1, multipliertype_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.coordinatesToMultiplierType = exports.coordinatesToMultiplier = exports.letterValueMap = exports.startingBagLetters = exports.emptyBoard = exports.coordinateChars = exports.BOARD_Y_LENGTH = exports.BOARD_X_LENGTH = exports.MAX_RACK_TILES = void 0;
    _ = __importStar(_);
    exports.MAX_RACK_TILES = 7;
    exports.BOARD_X_LENGTH = 15;
    exports.BOARD_Y_LENGTH = 15;
    exports.coordinateChars = "ABCDEFGHIJKLMNO";
    exports.emptyBoard = "\n   A B C D E F G H I J K L M N O\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 1| | | | | | | | | | | | | | | |0\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 2| | | | | | | | | | | | | | | |1\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 3| | | | | | | | | | | | | | | |2\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 4| | | | | | | | | | | | | | | |3\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 5| | | | | | | | | | | | | | | |4\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 6| | | | | | | | | | | | | | | |5\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 7| | | | | | | | | | | | | | | |6\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 8| | | | | | | | | | | | | | | |7\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 9| | | | | | | | | | | | | | | |8\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n10| | | | | | | | | | | | | | | |9\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n11| | | | | | | | | | | | | | | |10\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n12| | | | | | | | | | | | | | | |11\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n13| | | | | | | | | | | | | | | |12\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n14| | | | | | | | | | | | | | | |13\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n15| | | | | | | | | | | | | | | |14\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4\n";
    exports.startingBagLetters = _.flatten([
        _.times(2, function () { return letter_1.Letter.BLANK; }),
        _.times(9, function () { return letter_1.Letter.A; }),
        _.times(2, function () { return letter_1.Letter.B; }),
        _.times(2, function () { return letter_1.Letter.C; }),
        _.times(4, function () { return letter_1.Letter.D; }),
        _.times(12, function () { return letter_1.Letter.E; }),
        _.times(2, function () { return letter_1.Letter.F; }),
        _.times(3, function () { return letter_1.Letter.G; }),
        _.times(2, function () { return letter_1.Letter.H; }),
        _.times(9, function () { return letter_1.Letter.I; }),
        _.times(1, function () { return letter_1.Letter.J; }),
        _.times(1, function () { return letter_1.Letter.K; }),
        _.times(4, function () { return letter_1.Letter.L; }),
        _.times(2, function () { return letter_1.Letter.M; }),
        _.times(6, function () { return letter_1.Letter.N; }),
        _.times(8, function () { return letter_1.Letter.O; }),
        _.times(2, function () { return letter_1.Letter.P; }),
        _.times(1, function () { return letter_1.Letter.Q; }),
        _.times(6, function () { return letter_1.Letter.R; }),
        _.times(4, function () { return letter_1.Letter.S; }),
        _.times(6, function () { return letter_1.Letter.T; }),
        _.times(4, function () { return letter_1.Letter.U; }),
        _.times(2, function () { return letter_1.Letter.V; }),
        _.times(2, function () { return letter_1.Letter.W; }),
        _.times(1, function () { return letter_1.Letter.X; }),
        _.times(2, function () { return letter_1.Letter.Y; }),
        _.times(1, function () { return letter_1.Letter.Z; }),
    ]);
    exports.letterValueMap = (_a = {},
        _a[letter_1.Letter.UNSET] = 0,
        _a[letter_1.Letter.BLANK] = 0,
        _a[letter_1.Letter.A] = 1,
        _a[letter_1.Letter.B] = 3,
        _a[letter_1.Letter.C] = 3,
        _a[letter_1.Letter.D] = 2,
        _a[letter_1.Letter.E] = 1,
        _a[letter_1.Letter.F] = 4,
        _a[letter_1.Letter.G] = 2,
        _a[letter_1.Letter.H] = 4,
        _a[letter_1.Letter.I] = 1,
        _a[letter_1.Letter.J] = 8,
        _a[letter_1.Letter.K] = 5,
        _a[letter_1.Letter.L] = 1,
        _a[letter_1.Letter.M] = 3,
        _a[letter_1.Letter.N] = 1,
        _a[letter_1.Letter.O] = 1,
        _a[letter_1.Letter.P] = 3,
        _a[letter_1.Letter.Q] = 10,
        _a[letter_1.Letter.R] = 1,
        _a[letter_1.Letter.S] = 1,
        _a[letter_1.Letter.T] = 1,
        _a[letter_1.Letter.U] = 1,
        _a[letter_1.Letter.V] = 4,
        _a[letter_1.Letter.W] = 4,
        _a[letter_1.Letter.X] = 8,
        _a[letter_1.Letter.Y] = 4,
        _a[letter_1.Letter.Z] = 10,
        _a);
    exports.coordinatesToMultiplier = {
        // Triple words
        A1: multiplier_1.Multiplier.Triple,
        H1: multiplier_1.Multiplier.Triple,
        O1: multiplier_1.Multiplier.Triple,
        A8: multiplier_1.Multiplier.Triple,
        O8: multiplier_1.Multiplier.Triple,
        A15: multiplier_1.Multiplier.Triple,
        H15: multiplier_1.Multiplier.Triple,
        O15: multiplier_1.Multiplier.Triple,
        // Double words
        B2: multiplier_1.Multiplier.Double,
        N2: multiplier_1.Multiplier.Double,
        C3: multiplier_1.Multiplier.Double,
        M3: multiplier_1.Multiplier.Double,
        D4: multiplier_1.Multiplier.Double,
        L4: multiplier_1.Multiplier.Double,
        E5: multiplier_1.Multiplier.Double,
        K5: multiplier_1.Multiplier.Double,
        H8: multiplier_1.Multiplier.Double,
        E11: multiplier_1.Multiplier.Double,
        K11: multiplier_1.Multiplier.Double,
        D12: multiplier_1.Multiplier.Double,
        L12: multiplier_1.Multiplier.Double,
        C13: multiplier_1.Multiplier.Double,
        M13: multiplier_1.Multiplier.Double,
        B14: multiplier_1.Multiplier.Double,
        N14: multiplier_1.Multiplier.Double,
        // Triple letters
        F2: multiplier_1.Multiplier.Triple,
        J2: multiplier_1.Multiplier.Triple,
        B6: multiplier_1.Multiplier.Triple,
        F6: multiplier_1.Multiplier.Triple,
        J6: multiplier_1.Multiplier.Triple,
        N6: multiplier_1.Multiplier.Triple,
        B10: multiplier_1.Multiplier.Triple,
        F10: multiplier_1.Multiplier.Triple,
        J10: multiplier_1.Multiplier.Triple,
        N10: multiplier_1.Multiplier.Triple,
        F14: multiplier_1.Multiplier.Triple,
        J14: multiplier_1.Multiplier.Triple,
        // Double letters
        D1: multiplier_1.Multiplier.Double,
        L1: multiplier_1.Multiplier.Double,
        G3: multiplier_1.Multiplier.Double,
        I3: multiplier_1.Multiplier.Double,
        A4: multiplier_1.Multiplier.Double,
        H4: multiplier_1.Multiplier.Double,
        O4: multiplier_1.Multiplier.Double,
        C7: multiplier_1.Multiplier.Double,
        G7: multiplier_1.Multiplier.Double,
        I7: multiplier_1.Multiplier.Double,
        M7: multiplier_1.Multiplier.Double,
        D8: multiplier_1.Multiplier.Double,
        L8: multiplier_1.Multiplier.Double,
        C9: multiplier_1.Multiplier.Double,
        G9: multiplier_1.Multiplier.Double,
        I9: multiplier_1.Multiplier.Double,
        M9: multiplier_1.Multiplier.Double,
        A12: multiplier_1.Multiplier.Double,
        H12: multiplier_1.Multiplier.Double,
        O12: multiplier_1.Multiplier.Double,
        G13: multiplier_1.Multiplier.Double,
        I13: multiplier_1.Multiplier.Double,
        D15: multiplier_1.Multiplier.Double,
        L15: multiplier_1.Multiplier.Double,
    };
    exports.coordinatesToMultiplierType = {
        // Triple words
        A1: multipliertype_1.MultiplierType.Word,
        H1: multipliertype_1.MultiplierType.Word,
        O1: multipliertype_1.MultiplierType.Word,
        A8: multipliertype_1.MultiplierType.Word,
        O8: multipliertype_1.MultiplierType.Word,
        A15: multipliertype_1.MultiplierType.Word,
        H15: multipliertype_1.MultiplierType.Word,
        O15: multipliertype_1.MultiplierType.Word,
        // Double words
        B2: multipliertype_1.MultiplierType.Word,
        N2: multipliertype_1.MultiplierType.Word,
        C3: multipliertype_1.MultiplierType.Word,
        M3: multipliertype_1.MultiplierType.Word,
        D4: multipliertype_1.MultiplierType.Word,
        L4: multipliertype_1.MultiplierType.Word,
        E5: multipliertype_1.MultiplierType.Word,
        K5: multipliertype_1.MultiplierType.Word,
        H8: multipliertype_1.MultiplierType.Word,
        E11: multipliertype_1.MultiplierType.Word,
        K11: multipliertype_1.MultiplierType.Word,
        D12: multipliertype_1.MultiplierType.Word,
        L12: multipliertype_1.MultiplierType.Word,
        C13: multipliertype_1.MultiplierType.Word,
        M13: multipliertype_1.MultiplierType.Word,
        B14: multipliertype_1.MultiplierType.Word,
        N14: multipliertype_1.MultiplierType.Word,
        // Triple letters
        F2: multipliertype_1.MultiplierType.Letter,
        J2: multipliertype_1.MultiplierType.Letter,
        B6: multipliertype_1.MultiplierType.Letter,
        F6: multipliertype_1.MultiplierType.Letter,
        J6: multipliertype_1.MultiplierType.Letter,
        N6: multipliertype_1.MultiplierType.Letter,
        B10: multipliertype_1.MultiplierType.Letter,
        F10: multipliertype_1.MultiplierType.Letter,
        J10: multipliertype_1.MultiplierType.Letter,
        N10: multipliertype_1.MultiplierType.Letter,
        F14: multipliertype_1.MultiplierType.Letter,
        J14: multipliertype_1.MultiplierType.Letter,
        // Double letters
        D1: multipliertype_1.MultiplierType.Letter,
        L1: multipliertype_1.MultiplierType.Letter,
        G3: multipliertype_1.MultiplierType.Letter,
        I3: multipliertype_1.MultiplierType.Letter,
        A4: multipliertype_1.MultiplierType.Letter,
        H4: multipliertype_1.MultiplierType.Letter,
        O4: multipliertype_1.MultiplierType.Letter,
        C7: multipliertype_1.MultiplierType.Letter,
        G7: multipliertype_1.MultiplierType.Letter,
        I7: multipliertype_1.MultiplierType.Letter,
        M7: multipliertype_1.MultiplierType.Letter,
        D8: multipliertype_1.MultiplierType.Letter,
        L8: multipliertype_1.MultiplierType.Letter,
        C9: multipliertype_1.MultiplierType.Letter,
        G9: multipliertype_1.MultiplierType.Letter,
        I9: multipliertype_1.MultiplierType.Letter,
        M9: multipliertype_1.MultiplierType.Letter,
        A12: multipliertype_1.MultiplierType.Letter,
        H12: multipliertype_1.MultiplierType.Letter,
        O12: multipliertype_1.MultiplierType.Letter,
        G13: multipliertype_1.MultiplierType.Letter,
        I13: multipliertype_1.MultiplierType.Letter,
        D15: multipliertype_1.MultiplierType.Letter,
        L15: multipliertype_1.MultiplierType.Letter,
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/enums/actiontype.ts":
/*!*********************************!*\
  !*** ./src/enums/actiontype.ts ***!
  \*********************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ActionType = void 0;
    var ActionType;
    (function (ActionType) {
        ActionType["Play"] = "PLAY";
        ActionType["Skip"] = "SKIP";
        ActionType["Swap"] = "SWAP";
        ActionType["Draw"] = "DRAW";
        /** Doesn't get added to `actions` array */
        ActionType["Undo"] = "UNDO";
        /** Doesn't get added to `actions` array */
        ActionType["Redo"] = "REDO";
        ActionType["NewGame"] = "NEW_GAME";
        ActionType["EndGame"] = "GAME_OVER";
    })(ActionType = exports.ActionType || (exports.ActionType = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/enums/letter.ts":
/*!*****************************!*\
  !*** ./src/enums/letter.ts ***!
  \*****************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Letter = void 0;
    var Letter;
    (function (Letter) {
        Letter["UNSET"] = "";
        Letter["BLANK"] = "?";
        Letter["A"] = "A";
        Letter["B"] = "B";
        Letter["C"] = "C";
        Letter["D"] = "D";
        Letter["E"] = "E";
        Letter["F"] = "F";
        Letter["G"] = "G";
        Letter["H"] = "H";
        Letter["I"] = "I";
        Letter["J"] = "J";
        Letter["K"] = "K";
        Letter["L"] = "L";
        Letter["M"] = "M";
        Letter["N"] = "N";
        Letter["O"] = "O";
        Letter["P"] = "P";
        Letter["Q"] = "Q";
        Letter["R"] = "R";
        Letter["S"] = "S";
        Letter["T"] = "T";
        Letter["U"] = "U";
        Letter["V"] = "V";
        Letter["W"] = "W";
        Letter["X"] = "X";
        Letter["Y"] = "Y";
        Letter["Z"] = "Z";
    })(Letter = exports.Letter || (exports.Letter = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/enums/multiplier.ts":
/*!*********************************!*\
  !*** ./src/enums/multiplier.ts ***!
  \*********************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Multiplier = void 0;
    var Multiplier;
    (function (Multiplier) {
        Multiplier[Multiplier["None"] = 0] = "None";
        Multiplier[Multiplier["Single"] = 1] = "Single";
        Multiplier[Multiplier["Double"] = 2] = "Double";
        Multiplier[Multiplier["Triple"] = 3] = "Triple";
    })(Multiplier = exports.Multiplier || (exports.Multiplier = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/enums/multipliertype.ts":
/*!*************************************!*\
  !*** ./src/enums/multipliertype.ts ***!
  \*************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.MultiplierType = void 0;
    var MultiplierType;
    (function (MultiplierType) {
        MultiplierType["None"] = "";
        MultiplierType["Letter"] = "letter";
        MultiplierType["Word"] = "word";
    })(MultiplierType = exports.MultiplierType || (exports.MultiplierType = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/actionchangesturn.ts":
/*!********************************************!*\
  !*** ./src/functions/actionchangesturn.ts ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../enums/actiontype */ "./src/enums/actiontype.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, actiontype_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.actionChangesTurn = void 0;
    function actionChangesTurn(actionType) {
        switch (actionType) {
            case actiontype_1.ActionType.Play:
            case actiontype_1.ActionType.Skip:
            case actiontype_1.ActionType.Swap:
                return true;
            default:
                return false;
        }
    }
    exports.actionChangesTurn = actionChangesTurn;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/createbagfromactions.ts":
/*!***********************************************!*\
  !*** ./src/functions/createbagfromactions.ts ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../classes/bag */ "./src/classes/bag.ts"), __webpack_require__(/*! ./parseaction */ "./src/functions/parseaction.ts"), __webpack_require__(/*! ./parseletter */ "./src/functions/parseletter.ts"), __webpack_require__(/*! ../enums/actiontype */ "./src/enums/actiontype.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, bag_1, parseaction_1, parseletter_1, actiontype_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createBagFromActions = void 0;
    function createBagFromActions(actions) {
        var bag = new bag_1.Bag();
        actions.forEach(function (raw) {
            var _a = parseaction_1.parseAction(raw), actionType = _a[0], commandPart = _a[1];
            switch (actionType) {
                case actiontype_1.ActionType.Draw: {
                    var letters = commandPart.split("").map(parseletter_1.parseLetter);
                    bag.remove(letters);
                    break;
                }
                case actiontype_1.ActionType.Swap: {
                    // A swap command looks like: "SWAP ABC DEF".
                    // "SWAP" is the action
                    // "ABC DEF" is the command part
                    // "ABC" are the letters being exchanged
                    // "DEF" are the letters being drawn
                    var _b = commandPart.split(" "), sExchanged = _b[0], sDrawn = _b[1];
                    var exchanged = sExchanged.split("").map(parseletter_1.parseLetter);
                    var drawn = sDrawn.split("").map(parseletter_1.parseLetter);
                    bag.remove(drawn);
                    bag.add(exchanged);
                    break;
                }
                default:
                    break;
            }
        });
        return bag;
    }
    exports.createBagFromActions = createBagFromActions;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/createboardfromactions.ts":
/*!*************************************************!*\
  !*** ./src/functions/createboardfromactions.ts ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./createnewboard */ "./src/functions/createnewboard.ts"), __webpack_require__(/*! ./parseplaycommand */ "./src/functions/parseplaycommand.ts"), __webpack_require__(/*! ./parseaction */ "./src/functions/parseaction.ts"), __webpack_require__(/*! ./playmove */ "./src/functions/playmove.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, createnewboard_1, parseplaycommand_1, parseaction_1, playmove_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createBoardFromActions = void 0;
    function createBoardFromActions(actions) {
        var board = createnewboard_1.createNewBoard();
        actions
            // Hacky way of filtering to all PLAY actions
            .filter(function (act) { return act.search(/PLAY /i) === 0; })
            .map(function (act) { return parseaction_1.parseAction(act)[1]; })
            .forEach(function (cmd) {
            var move = parseplaycommand_1.parsePlayCommand(cmd);
            var result = playmove_1.playMove(move, board);
            board = result.board;
        });
        return board;
    }
    exports.createBoardFromActions = createBoardFromActions;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/createboardfromstatus.ts":
/*!************************************************!*\
  !*** ./src/functions/createboardfromstatus.ts ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../enums/letter */ "./src/enums/letter.ts"), __webpack_require__(/*! ./createnewboard */ "./src/functions/createnewboard.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, letter_1, createnewboard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createBoardFromStatus = void 0;
    function createBoardFromStatus(status) {
        var statusBoard = status.board;
        var newBoard = createnewboard_1.createNewBoard();
        for (var y = 0; y < statusBoard.length; y++)
            for (var x = 0; x < statusBoard[y].length; x++) {
                var square = newBoard[y][x];
                var cha = statusBoard[y][x];
                if (cha) {
                    square.played = true;
                    if (/[a-z]/.test(cha)) {
                        square.letter = letter_1.Letter.BLANK;
                        square.blankLetter = cha;
                    }
                    else {
                        square.letter = cha;
                    }
                }
            }
        return newBoard;
    }
    exports.createBoardFromStatus = createBoardFromStatus;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/createnewboard.ts":
/*!*****************************************!*\
  !*** ./src/functions/createnewboard.ts ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./parseboard */ "./src/functions/parseboard.ts"), __webpack_require__(/*! ../constants */ "./src/constants.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, parseboard_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createNewBoard = void 0;
    function createNewBoard() {
        return parseboard_1.parseBoard(constants_1.emptyBoard);
    }
    exports.createNewBoard = createNewBoard;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/createplaycommand.ts":
/*!********************************************!*\
  !*** ./src/functions/createplaycommand.ts ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! underscore */ "underscore"), __webpack_require__(/*! ../constants */ "./src/constants.ts"), __webpack_require__(/*! ./parsesquarecoordinates */ "./src/functions/parsesquarecoordinates.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _, constants_1, parsesquarecoordinates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createPlayCommand = void 0;
    _ = __importStar(_);
    /**
     * This function is for a UI implementation to create a play command.
     * It is expected that the UI context would only have knowledge of the letters
     * being played, and the letters on the board.
     * From that, we have to determine what the official "move" is.
     * @param {ISquare[]} move - ONLY consists of squares from "rack".
     * @param {ISquare[][]} board - ONLY consists of squares from "board" (and not `move`).
     */
    function createPlayCommand(move, board) {
        // First check that all of the squares from the move are in the same row or col
        var sameCol = _.unique(move.map(function (sq) { return parsesquarecoordinates_1.parseSquareCoordinates(sq)[0]; })).length == 1;
        var sameRow = _.unique(move.map(function (sq) { return parsesquarecoordinates_1.parseSquareCoordinates(sq)[1]; })).length == 1;
        if (!sameRow && !sameCol)
            throw new Error("Move letters weren't placed on the same row or column");
        var cmd = "";
        if (sameRow)
            cmd = checkSameRow(move, board, sameCol && sameRow);
        else
            cmd = checkSameCol(move, board);
        if (!cmd)
            throw new Error("Invalid command (reason unknown)");
        return cmd;
    }
    exports.createPlayCommand = createPlayCommand;
    function checkSameRow(move, board, isAmbiguous) {
        var word = "";
        var passedFirst = false;
        var passedLast = false;
        var started = false;
        var startingCoord = 0;
        var y = parsesquarecoordinates_1.parseSquareCoordinates(move[0])[1];
        var sorted = _.sortBy(move, function (sq) { return parsesquarecoordinates_1.parseSquareCoordinates(sq)[1]; });
        var first = sorted[0];
        var last = sorted[sorted.length - 1];
        var _loop_1 = function (x) {
            var sq = board[y][x];
            // Does the square consist of a letter?
            if (sq.played || move.some(function (m) { return m.id === sq.id; })) {
                if (!started) {
                    started = true;
                    startingCoord = x;
                    word = "";
                }
                word += sq.blankLetter ? sq.blankLetter.toLowerCase() : sq.letter;
                if (!passedFirst && sq.id === first.id)
                    passedFirst = true;
                if (!passedLast && sq.id === last.id)
                    passedLast = true;
            }
            else if (started) {
                if (passedFirst && passedLast)
                    if (isAmbiguous && word.length === 1)
                        return { value: checkSameCol(move, board) };
                    else
                        return { value: word + " " + (constants_1.coordinateChars.charAt(startingCoord) + (y + 1)) + " H" };
                if (passedFirst || passedLast)
                    throw new Error("Move doesn't entirely connect");
                started = false;
            }
        };
        for (var x = 0; x < constants_1.BOARD_X_LENGTH; x++) {
            var state_1 = _loop_1(x);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        // Should only be true if word ends at edge of board.
        if (passedFirst && passedLast)
            if (isAmbiguous && word.length === 1)
                return checkSameCol(move, board);
            else
                return word + " " + (constants_1.coordinateChars.charAt(startingCoord) + (y + 1)) + " H";
    }
    function checkSameCol(move, board) {
        var word = "";
        var passedFirst = false;
        var passedLast = false;
        var started = false;
        var startingCoord = 0;
        var x = parsesquarecoordinates_1.parseSquareCoordinates(move[0])[0];
        var sorted = _.sortBy(move, function (sq) { return parsesquarecoordinates_1.parseSquareCoordinates(sq)[0]; });
        var first = sorted[0];
        var last = sorted[sorted.length - 1];
        var _loop_2 = function (y) {
            var sq = board[y][x];
            if (sq.played || move.some(function (m) { return m.id === sq.id; })) {
                if (!started) {
                    started = true;
                    startingCoord = y;
                    word = "";
                }
                word += sq.blankLetter ? sq.blankLetter.toLowerCase() : sq.letter;
                if (!passedFirst && sq.id === first.id)
                    passedFirst = true;
                if (!passedLast && sq.id === last.id)
                    passedLast = true;
            }
            else if (started) {
                if (passedFirst && passedLast)
                    return { value: word + " " + (constants_1.coordinateChars.charAt(x) + (startingCoord + 1)) + " V" };
                if (passedFirst || passedLast)
                    throw new Error("Move doesn't entirely connect");
                started = false;
            }
        };
        for (var y = 0; y < constants_1.BOARD_Y_LENGTH; y++) {
            var state_2 = _loop_2(y);
            if (typeof state_2 === "object")
                return state_2.value;
        }
        // Should only be true if word ends at edge of board.
        if (passedFirst && passedLast)
            return word + " " + (constants_1.coordinateChars.charAt(x) + (startingCoord + 1)) + " V";
    }
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/createrackfromactions.ts":
/*!************************************************!*\
  !*** ./src/functions/createrackfromactions.ts ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./createracksfromactions */ "./src/functions/createracksfromactions.ts"), __webpack_require__(/*! ./getturnfromactions */ "./src/functions/getturnfromactions.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, createracksfromactions_1, getturnfromactions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createRackFromActions = void 0;
    function createRackFromActions(rawActions, teams) {
        var racks = createracksfromactions_1.createRacksFromActions(rawActions, teams);
        var teamTurn = getturnfromactions_1.getTurnFromActions(rawActions, teams);
        // Rack index = team-number - 1 (since team counting starts at 1)
        return racks[teamTurn - 1];
    }
    exports.createRackFromActions = createRackFromActions;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/createracksfromactions.ts":
/*!*************************************************!*\
  !*** ./src/functions/createracksfromactions.ts ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! underscore */ "underscore"), __webpack_require__(/*! ../classes/rack */ "./src/classes/rack.ts"), __webpack_require__(/*! ../enums/actiontype */ "./src/enums/actiontype.ts"), __webpack_require__(/*! ./createnewboard */ "./src/functions/createnewboard.ts"), __webpack_require__(/*! ./playmove */ "./src/functions/playmove.ts"), __webpack_require__(/*! ./parseletter */ "./src/functions/parseletter.ts"), __webpack_require__(/*! ./parseaction */ "./src/functions/parseaction.ts"), __webpack_require__(/*! ./getnextturn */ "./src/functions/getnextturn.ts"), __webpack_require__(/*! ./actionchangesturn */ "./src/functions/actionchangesturn.ts"), __webpack_require__(/*! ./parseplaycommand */ "./src/functions/parseplaycommand.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _, rack_1, actiontype_1, createnewboard_1, playmove_1, parseletter_1, parseaction_1, getnextturn_1, actionchangesturn_1, parseplaycommand_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createRacksFromActions = void 0;
    _ = __importStar(_);
    function createRacksFromActions(rawActions, teams) {
        var board = createnewboard_1.createNewBoard();
        var teamTurn = 1;
        var racks = _.times(teams, function () { return new rack_1.Rack(); });
        rawActions.forEach(function (raw) {
            var _a = parseaction_1.parseAction(raw), actionType = _a[0], commandPart = _a[1];
            var rack = racks[teamTurn - 1];
            switch (actionType) {
                case actiontype_1.ActionType.Play: {
                    var result = playmove_1.playMove(parseplaycommand_1.parsePlayCommand(commandPart), board);
                    board = result.board;
                    rack.remove(result.usedLetters);
                    break;
                }
                case actiontype_1.ActionType.Swap: {
                    var _b = commandPart.split(" "), sExchanged = _b[0], sDrawn = _b[1];
                    var exchanged = sExchanged.split("").map(parseletter_1.parseLetter);
                    var drawn = sDrawn.split("").map(parseletter_1.parseLetter);
                    rack.remove(exchanged);
                    rack.add(drawn);
                    break;
                }
                case actiontype_1.ActionType.Draw:
                    rack.add(commandPart.split("").map(parseletter_1.parseLetter));
                    break;
                default:
                    break;
            }
            if (actionchangesturn_1.actionChangesTurn(actionType)) {
                teamTurn = getnextturn_1.getNextTurn(teams, teamTurn, false);
            }
        });
        return racks;
    }
    exports.createRacksFromActions = createRacksFromActions;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/getmovelogfromactions.ts":
/*!************************************************!*\
  !*** ./src/functions/getmovelogfromactions.ts ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../enums/actiontype */ "./src/enums/actiontype.ts"), __webpack_require__(/*! ./createnewboard */ "./src/functions/createnewboard.ts"), __webpack_require__(/*! ./playmove */ "./src/functions/playmove.ts"), __webpack_require__(/*! ./parseaction */ "./src/functions/parseaction.ts"), __webpack_require__(/*! ./getnextturn */ "./src/functions/getnextturn.ts"), __webpack_require__(/*! ./actionchangesturn */ "./src/functions/actionchangesturn.ts"), __webpack_require__(/*! ./parseplaycommand */ "./src/functions/parseplaycommand.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, actiontype_1, createnewboard_1, playmove_1, parseaction_1, getnextturn_1, actionchangesturn_1, parseplaycommand_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.getMoveLogFromActions = void 0;
    function getMoveLogFromActions(rawActions, teams) {
        var board = createnewboard_1.createNewBoard();
        var teamTurn = 1;
        var moves = [];
        rawActions.forEach(function (raw) {
            var _a = parseaction_1.parseAction(raw), actionType = _a[0], commandPart = _a[1];
            var move = "";
            switch (actionType) {
                case actiontype_1.ActionType.NewGame:
                    move += "Game started";
                    break;
                case actiontype_1.ActionType.Skip:
                    move += "Team " + teamTurn + " skipped";
                    break;
                case actiontype_1.ActionType.Draw:
                    move += "Team " + teamTurn + " drew " + commandPart.length + " tiles";
                    break;
                case actiontype_1.ActionType.Swap:
                    move += "Team " + teamTurn + " swapped " + commandPart.split(" ")[0].length + " tiles";
                    break;
                case actiontype_1.ActionType.Play: {
                    var total = 0;
                    move += "Team " + teamTurn + " played ";
                    var result = playmove_1.playMove(parseplaycommand_1.parsePlayCommand(commandPart), board);
                    board = result.board;
                    var words = [];
                    for (var _i = 0, _b = result.words; _i < _b.length; _i++) {
                        var word = _b[_i];
                        words.push(word.word + " (" + word.points + ")");
                        total += word.points;
                    }
                    move += words.join(", ");
                    if (words.length > 1) {
                        move += " for a total of " + total;
                    }
                    break;
                }
                case actiontype_1.ActionType.EndGame:
                    move += "Game over";
                    break;
                default:
                    break;
            }
            moves.push(move);
            if (actionchangesturn_1.actionChangesTurn(actionType)) {
                teamTurn = getnextturn_1.getNextTurn(teams, teamTurn, false);
            }
        });
        return moves;
    }
    exports.getMoveLogFromActions = getMoveLogFromActions;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/getnextturn.ts":
/*!**************************************!*\
  !*** ./src/functions/getnextturn.ts ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.getNextTurn = void 0;
    function getNextTurn(teams, teamTurn, oppositeDirection) {
        if (oppositeDirection) {
            return (teamTurn - 1) % teams || teams;
        }
        // Ensure non-zero (e.g. if 3 teams: 1 -> 2 -> 3 -> 1)
        return (teamTurn + 1) % teams || teams;
    }
    exports.getNextTurn = getNextTurn;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/getpointsfromsquare.ts":
/*!**********************************************!*\
  !*** ./src/functions/getpointsfromsquare.ts ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../constants */ "./src/constants.ts"), __webpack_require__(/*! ../enums/multipliertype */ "./src/enums/multipliertype.ts"), __webpack_require__(/*! ./parseletter */ "./src/functions/parseletter.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, constants_1, multipliertype_1, parseletter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.getPointsFromSquare = void 0;
    /**
     * Returns points for a letter played on a square.
     * In the case of a square representing a word-multiplier,
     * the multiplier is added to the `multipliers` argument for
     * later evaluation.
     */
    function getPointsFromSquare(sq, multipliers) {
        var points = constants_1.letterValueMap[parseletter_1.parseLetter(sq.letter)];
        if (!sq.played) {
            if (sq.multiplierType === multipliertype_1.MultiplierType.Word) {
                multipliers.push(sq.multiplier);
            }
            else if (sq.multiplierType === multipliertype_1.MultiplierType.Letter) {
                points *= sq.multiplier;
            }
        }
        return points;
    }
    exports.getPointsFromSquare = getPointsFromSquare;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/getscoresfromactions.ts":
/*!***********************************************!*\
  !*** ./src/functions/getscoresfromactions.ts ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! underscore */ "underscore"), __webpack_require__(/*! ../enums/actiontype */ "./src/enums/actiontype.ts"), __webpack_require__(/*! ./createnewboard */ "./src/functions/createnewboard.ts"), __webpack_require__(/*! ./playmove */ "./src/functions/playmove.ts"), __webpack_require__(/*! ./parseaction */ "./src/functions/parseaction.ts"), __webpack_require__(/*! ./getnextturn */ "./src/functions/getnextturn.ts"), __webpack_require__(/*! ./actionchangesturn */ "./src/functions/actionchangesturn.ts"), __webpack_require__(/*! ./parseplaycommand */ "./src/functions/parseplaycommand.ts"), __webpack_require__(/*! ./createracksfromactions */ "./src/functions/createracksfromactions.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _, actiontype_1, createnewboard_1, playmove_1, parseaction_1, getnextturn_1, actionchangesturn_1, parseplaycommand_1, createracksfromactions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.getScoresFromActions = void 0;
    _ = __importStar(_);
    function getScoresFromActions(rawActions, teams) {
        var board = createnewboard_1.createNewBoard();
        var teamTurn = 1;
        var scores = _.times(teams, function () { return 0; });
        rawActions.forEach(function (raw) {
            var _a = parseaction_1.parseAction(raw), actionType = _a[0], commandPart = _a[1];
            switch (actionType) {
                case actiontype_1.ActionType.Play: {
                    var result = playmove_1.playMove(parseplaycommand_1.parsePlayCommand(commandPart), board);
                    board = result.board;
                    scores[teamTurn - 1] += result.words.reduce(function (sum, w) { return sum + w.points; }, 0);
                    break;
                }
                case actiontype_1.ActionType.EndGame: {
                    var racks = createracksfromactions_1.createRacksFromActions(rawActions, teams);
                    // First empty rack gets all the other rack's points.
                    var emptyRackIndex = _.findIndex(racks, function (r) { return r.isEmpty(); });
                    // If no empty rack, no points added/subtracted.
                    for (var i = 0; emptyRackIndex > -1 && i < teams; i++) {
                        if (i === emptyRackIndex)
                            continue;
                        var points = racks[i].totalPoints();
                        scores[i] -= points;
                        scores[emptyRackIndex] += points;
                    }
                    break;
                }
                default:
                    break;
            }
            if (actionchangesturn_1.actionChangesTurn(actionType)) {
                teamTurn = getnextturn_1.getNextTurn(teams, teamTurn, false);
            }
        });
        return scores;
    }
    exports.getScoresFromActions = getScoresFromActions;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/getturnfromactions.ts":
/*!*********************************************!*\
  !*** ./src/functions/getturnfromactions.ts ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./parseaction */ "./src/functions/parseaction.ts"), __webpack_require__(/*! ./actionchangesturn */ "./src/functions/actionchangesturn.ts"), __webpack_require__(/*! ./getnextturn */ "./src/functions/getnextturn.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, parseaction_1, actionchangesturn_1, getnextturn_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.getTurnFromActions = void 0;
    function getTurnFromActions(actions, teams) {
        var teamTurn = 1;
        actions.forEach(function (raw) {
            var actionType = parseaction_1.parseAction(raw)[0];
            if (actionchangesturn_1.actionChangesTurn(actionType)) {
                teamTurn = getnextturn_1.getNextTurn(teams, teamTurn, false);
            }
        });
        return teamTurn;
    }
    exports.getTurnFromActions = getTurnFromActions;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/parseaction.ts":
/*!**************************************!*\
  !*** ./src/functions/parseaction.ts ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.parseAction = void 0;
    function parseAction(rawAction) {
        var _a = (rawAction || "").split(" "), action = _a[0], rest = _a.slice(1);
        var actionType = action.toUpperCase();
        var commandPart = rest && rest.length > 0 ? rest.join(" ") : "";
        return [actionType, commandPart];
    }
    exports.parseAction = parseAction;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/parseboard.ts":
/*!*************************************!*\
  !*** ./src/functions/parseboard.ts ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! underscore */ "underscore"), __webpack_require__(/*! ../constants */ "./src/constants.ts"), __webpack_require__(/*! ../enums/letter */ "./src/enums/letter.ts"), __webpack_require__(/*! ./parseletter */ "./src/functions/parseletter.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _, constants_1, letter_1, parseletter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.parseBoard = void 0;
    _ = __importStar(_);
    var lowerCaseRx = /[a-z]/;
    function parseBoard(board) {
        var _a;
        var captures = [];
        var rx = /\|([A-Za-z '":.])/g;
        var result = null;
        while ((result = rx.exec(board))) {
            captures.push(/[A-Za-z]/.test((_a = result[1]) !== null && _a !== void 0 ? _a : "_") ? result[1] : "");
        }
        return _.chunk(captures, constants_1.BOARD_X_LENGTH).map(function (letters, i) {
            return letters.map(function (letter, j) {
                var coordinates = constants_1.coordinateChars.charAt(j) + (i + 1);
                var isBlank = lowerCaseRx.test(letter);
                return {
                    id: coordinates,
                    letter: parseletter_1.parseLetter(letter),
                    played: letter !== letter_1.Letter.UNSET,
                    blankLetter: isBlank ? letter : "",
                    multiplier: constants_1.coordinatesToMultiplier[coordinates],
                    multiplierType: constants_1.coordinatesToMultiplierType[coordinates],
                };
            });
        });
    }
    exports.parseBoard = parseBoard;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/parseletter.ts":
/*!**************************************!*\
  !*** ./src/functions/parseletter.ts ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../enums/letter */ "./src/enums/letter.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, letter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.parseLetter = void 0;
    var lowerCaseRx = /[a-z]/;
    function parseLetter(letter) {
        if (lowerCaseRx.test(letter))
            return letter_1.Letter.BLANK;
        return letter;
    }
    exports.parseLetter = parseLetter;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/parseplaycommand.ts":
/*!*******************************************!*\
  !*** ./src/functions/parseplaycommand.ts ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! underscore */ "underscore"), __webpack_require__(/*! ../constants */ "./src/constants.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.parsePlayCommand = void 0;
    _ = __importStar(_);
    var playCommandRx = /^(\w+) ([A-Oa-o])(1?[0-9]) ([HhVv])$/;
    function parsePlayCommand(playCommand) {
        var parsed = playCommandRx.exec(playCommand);
        if (!parsed) {
            throw new Error("Bad command");
        }
        var _a = parsed.slice(-4), word = _a[0], startX = _a[1], startY = _a[2], dir = _a[3];
        if (_.any([word, startX, startY, dir], _.isUndefined)) {
            throw new Error("Bad command");
        }
        if (word.length < 2) {
            throw new Error("Word must be at least 2 letters long");
        }
        return {
            x: constants_1.coordinateChars.indexOf(startX.toUpperCase()),
            y: parseInt(startY, 10) - 1,
            isVertical: dir.toUpperCase() === "V",
            letters: word.split(""),
            id: startX + startY,
        };
    }
    exports.parsePlayCommand = parsePlayCommand;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/parsesquarecoordinates.ts":
/*!*************************************************!*\
  !*** ./src/functions/parsesquarecoordinates.ts ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../constants */ "./src/constants.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.parseSquareCoordinates = void 0;
    function parseSquareCoordinates(square) {
        var xPart = square.id.charAt(0); // e.g. "A"
        var yPart = square.id.substr(1); // e.g. "11"
        return [constants_1.coordinateChars.indexOf(xPart), parseInt(yPart, 10) - 1];
    }
    exports.parseSquareCoordinates = parseSquareCoordinates;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/playcommandhaslettersfromrack.ts":
/*!********************************************************!*\
  !*** ./src/functions/playcommandhaslettersfromrack.ts ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! underscore */ "underscore"), __webpack_require__(/*! ./parseletter */ "./src/functions/parseletter.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _, parseletter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.playCommandHasLettersFromRack = void 0;
    _ = __importStar(_);
    /**
     * Makes sure that at least one of the rack's tiles is in the move.
     */
    function playCommandHasLettersFromRack(move, letters) {
        var moveLetters = _.map(move.letters, parseletter_1.parseLetter);
        return _.intersection(moveLetters, letters).length > 0;
    }
    exports.playCommandHasLettersFromRack = playCommandHasLettersFromRack;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/playmove.ts":
/*!***********************************!*\
  !*** ./src/functions/playmove.ts ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! knockout */ "knockout"), __webpack_require__(/*! ./getpointsfromsquare */ "./src/functions/getpointsfromsquare.ts"), __webpack_require__(/*! ./parseletter */ "./src/functions/parseletter.ts"), __webpack_require__(/*! ../constants */ "./src/constants.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ko, getpointsfromsquare_1, parseletter_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.playMove = void 0;
    ko = __importStar(ko);
    var lowerCaseRx = /[a-z]/;
    // Is first word?
    function playMove(move, board) {
        var isFirstWord = board.every(function (row) { return row.every(function (sq) { return !sq.played; }); });
        var wordMultipliers = [];
        var connectsToPlayedSquare = false;
        var points = 0;
        var newlyPlayedSquares = 0;
        var result = {
            board: ko.toJS(board),
            words: [],
            usedLetters: [],
        };
        if (move.isVertical) {
            var moveY_1 = move.y;
            move.letters.forEach(function (letter) {
                var sq = result.board[moveY_1][move.x];
                if (sq.played &&
                    sq.letter !== letter &&
                    sq.blankLetter !== letter) {
                    throw new Error("Invalid move");
                }
                if (!sq.played) {
                    // Set the letter.
                    sq.letter = parseletter_1.parseLetter(letter);
                    result.usedLetters.push(sq.letter);
                    if (lowerCaseRx.test(letter))
                        sq.blankLetter = letter;
                }
                else {
                    connectsToPlayedSquare = true;
                }
                // Extract the points.
                points += getpointsfromsquare_1.getPointsFromSquare(sq, wordMultipliers);
                if (!sq.played) {
                    newlyPlayedSquares += 1;
                    var crossingPoints_1 = 0;
                    var x = move.x;
                    var crossSq = void 0;
                    var word = [];
                    var xLength = result.board[moveY_1].length;
                    // If there is board space to the left
                    if (x > 0) {
                        x--;
                        // Collect all horizontally intersecting letters on the
                        // left side of our vertical word.
                        do {
                            crossSq = result.board[moveY_1][x];
                            if (crossSq && crossSq.letter) {
                                word.unshift(crossSq);
                            }
                        } while (--x >= 0 && crossSq.letter);
                    }
                    if (word.length > 0) {
                        // Add our letter to the crossing word.
                        word.push(sq);
                    }
                    x = move.x;
                    // If there is board space to the right.
                    if (x < xLength - 1) {
                        x++;
                        // Collect all horizontally intersecting letters on the
                        // right side of our vertical word.
                        do {
                            crossSq = result.board[moveY_1][x];
                            if (crossSq && crossSq.letter) {
                                word.push(crossSq);
                            }
                        } while (++x < xLength && crossSq.letter);
                    }
                    // Add our letter to the crossing word if it hasn't yet been.
                    if (word.length > 0 && word.indexOf(sq) === -1) {
                        word.unshift(sq);
                    }
                    var mults_1 = [];
                    word.forEach(function (_sq) {
                        crossingPoints_1 += getpointsfromsquare_1.getPointsFromSquare(_sq, mults_1);
                    });
                    mults_1.forEach(function (m) { return (crossingPoints_1 *= m); });
                    if (word.length > 0) {
                        connectsToPlayedSquare = true;
                        result.words.push({
                            word: word
                                .map(function (_sq) {
                                return _sq.blankLetter
                                    ? _sq.blankLetter.toLowerCase()
                                    : _sq.letter;
                            })
                                .join(""),
                            points: crossingPoints_1,
                        });
                    }
                }
                moveY_1++;
                sq.played = true;
            });
        }
        else {
            var moveX_1 = move.x;
            move.letters.forEach(function (letter) {
                var sq = result.board[move.y][moveX_1];
                if (sq.played &&
                    sq.letter !== letter &&
                    sq.blankLetter !== letter) {
                    throw new Error("Invalid move");
                }
                if (!sq.played) {
                    sq.letter = parseletter_1.parseLetter(letter);
                    result.usedLetters.push(sq.letter);
                    if (lowerCaseRx.test(letter))
                        sq.blankLetter = letter;
                }
                else {
                    connectsToPlayedSquare = true;
                }
                points += getpointsfromsquare_1.getPointsFromSquare(sq, wordMultipliers);
                if (!sq.played) {
                    newlyPlayedSquares += 1;
                    var crossingPoints_2 = 0;
                    var y = move.y;
                    var crossSq = void 0;
                    var word = [];
                    var yLength = result.board.length;
                    if (y > 0) {
                        y--;
                        do {
                            crossSq = result.board[y][moveX_1];
                            if (crossSq && crossSq.letter) {
                                word.unshift(crossSq);
                            }
                        } while (--y >= 0 && crossSq.letter);
                    }
                    if (word.length > 0) {
                        // Add our letter to the crossing word
                        word.push(sq);
                    }
                    y = move.y;
                    if (y < yLength - 1) {
                        y++;
                        do {
                            crossSq = result.board[y][moveX_1];
                            // starting right the NEXT left cell, add self + rest of
                            // cells until vacant one found
                            if (crossSq && crossSq.letter) {
                                word.push(crossSq);
                            }
                        } while (++y < yLength && crossSq.letter);
                    }
                    if (word.length > 0 && word.indexOf(sq) === -1) {
                        word.unshift(sq);
                    }
                    var mults_2 = [];
                    word.forEach(function (_sq) {
                        crossingPoints_2 += getpointsfromsquare_1.getPointsFromSquare(_sq, mults_2);
                    });
                    mults_2.forEach(function (m) { return (crossingPoints_2 *= m); });
                    if (word.length > 0) {
                        connectsToPlayedSquare = true;
                        result.words.push({
                            word: word
                                .map(function (_sq) {
                                return _sq.blankLetter
                                    ? _sq.blankLetter.toLowerCase()
                                    : _sq.letter;
                            })
                                .join(""),
                            points: crossingPoints_2,
                        });
                    }
                }
                moveX_1++;
                sq.played = true;
            });
        }
        if (isFirstWord && !result.board[7][7].played) {
            throw new Error("First word must include middle square");
        }
        else if (!isFirstWord && !connectsToPlayedSquare) {
            throw new Error("Word must connect to other words on the board");
        }
        else if (newlyPlayedSquares > constants_1.MAX_RACK_TILES) {
            throw new Error("Word is larger than maximum amount of tiles");
        }
        wordMultipliers.forEach(function (mult) {
            // Add up points for word in play command.
            points *= mult;
        });
        // Add the original word played.
        result.words.unshift({
            word: move.letters.join(""),
            points: points,
        });
        if (newlyPlayedSquares === constants_1.MAX_RACK_TILES) {
            // Add bingo points, if applicable.
            result.words.push({
                word: "*BINGO*",
                points: 50,
            });
        }
        return result;
    }
    exports.playMove = playMove;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/functions/printboard.ts":
/*!*************************************!*\
  !*** ./src/functions/printboard.ts ***!
  \*************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../enums/multiplier */ "./src/enums/multiplier.ts"), __webpack_require__(/*! ../enums/multipliertype */ "./src/enums/multipliertype.ts"), __webpack_require__(/*! ../constants */ "./src/constants.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, multiplier_1, multipliertype_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.printBoard = void 0;
    function printBoard(board) {
        var template = "\n   A B C D E F G H I J K L M N O\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 1|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|0\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 2|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|1\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 3|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|2\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 4|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|3\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 5|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|4\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 6|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|5\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 7|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|6\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 8|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|7\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n 9|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|8\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n10|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|9\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n11|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|10\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n12|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|11\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n13|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|12\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n14|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|13\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n15|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|14\n  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4\n    ";
        var i = 0;
        return template.replace(/X/g, function () {
            var sq = board[Math.floor(i / constants_1.BOARD_X_LENGTH)][i % constants_1.BOARD_X_LENGTH];
            i += 1;
            var letter = sq.blankLetter || sq.letter || " ";
            if (letter == " " && sq.multiplier != multiplier_1.Multiplier.None) {
                if (sq.multiplier == multiplier_1.Multiplier.Double &&
                    sq.multiplierType == multipliertype_1.MultiplierType.Letter)
                    return ".";
                if (sq.multiplier == multiplier_1.Multiplier.Triple &&
                    sq.multiplierType == multipliertype_1.MultiplierType.Letter)
                    return ":";
                if (sq.multiplier == multiplier_1.Multiplier.Double &&
                    sq.multiplierType == multipliertype_1.MultiplierType.Word)
                    return "'";
                if (sq.multiplier == multiplier_1.Multiplier.Triple &&
                    sq.multiplierType == multipliertype_1.MultiplierType.Word)
                    return '"';
            }
            return letter;
        });
    }
    exports.printBoard = printBoard;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/scrabblecore.ts":
/*!*****************************!*\
  !*** ./src/scrabblecore.ts ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./constants */ "./src/constants.ts"), __webpack_require__(/*! ./classes/bag */ "./src/classes/bag.ts"), __webpack_require__(/*! ./classes/game */ "./src/classes/game.ts"), __webpack_require__(/*! ./classes/rack */ "./src/classes/rack.ts"), __webpack_require__(/*! ./enums/actiontype */ "./src/enums/actiontype.ts"), __webpack_require__(/*! ./enums/letter */ "./src/enums/letter.ts"), __webpack_require__(/*! ./enums/multiplier */ "./src/enums/multiplier.ts"), __webpack_require__(/*! ./enums/multipliertype */ "./src/enums/multipliertype.ts"), __webpack_require__(/*! ./functions/actionchangesturn */ "./src/functions/actionchangesturn.ts"), __webpack_require__(/*! ./functions/createbagfromactions */ "./src/functions/createbagfromactions.ts"), __webpack_require__(/*! ./functions/createboardfromactions */ "./src/functions/createboardfromactions.ts"), __webpack_require__(/*! ./functions/createnewboard */ "./src/functions/createnewboard.ts"), __webpack_require__(/*! ./functions/createplaycommand */ "./src/functions/createplaycommand.ts"), __webpack_require__(/*! ./functions/createrackfromactions */ "./src/functions/createrackfromactions.ts"), __webpack_require__(/*! ./functions/createracksfromactions */ "./src/functions/createracksfromactions.ts"), __webpack_require__(/*! ./functions/getmovelogfromactions */ "./src/functions/getmovelogfromactions.ts"), __webpack_require__(/*! ./functions/getnextturn */ "./src/functions/getnextturn.ts"), __webpack_require__(/*! ./functions/getpointsfromsquare */ "./src/functions/getpointsfromsquare.ts"), __webpack_require__(/*! ./functions/getscoresfromactions */ "./src/functions/getscoresfromactions.ts"), __webpack_require__(/*! ./functions/getturnfromactions */ "./src/functions/getturnfromactions.ts"), __webpack_require__(/*! ./functions/parseaction */ "./src/functions/parseaction.ts"), __webpack_require__(/*! ./functions/parseboard */ "./src/functions/parseboard.ts"), __webpack_require__(/*! ./functions/parseletter */ "./src/functions/parseletter.ts"), __webpack_require__(/*! ./functions/parseplaycommand */ "./src/functions/parseplaycommand.ts"), __webpack_require__(/*! ./functions/parsesquarecoordinates */ "./src/functions/parsesquarecoordinates.ts"), __webpack_require__(/*! ./functions/playcommandhaslettersfromrack */ "./src/functions/playcommandhaslettersfromrack.ts"), __webpack_require__(/*! ./functions/playmove */ "./src/functions/playmove.ts"), __webpack_require__(/*! ./functions/printboard */ "./src/functions/printboard.ts"), __webpack_require__(/*! ./functions/createboardfromstatus */ "./src/functions/createboardfromstatus.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, constants, bag_1, game_1, rack_1, actiontype_1, letter_1, multiplier_1, multipliertype_1, actionchangesturn_1, createbagfromactions_1, createboardfromactions_1, createnewboard_1, createplaycommand_1, createrackfromactions_1, createracksfromactions_1, getmovelogfromactions_1, getnextturn_1, getpointsfromsquare_1, getscoresfromactions_1, getturnfromactions_1, parseaction_1, parseboard_1, parseletter_1, parseplaycommand_1, parsesquarecoordinates_1, playcommandhaslettersfromrack_1, playmove_1, printboard_1, createboardfromstatus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createBoardFromStatus = exports.printBoard = exports.playMove = exports.playCommandHasLettersFromRack = exports.parseSquareCoordinates = exports.parsePlayCommand = exports.parseLetter = exports.parseBoard = exports.parseAction = exports.getTurnFromActions = exports.getScoresFromActions = exports.getPointsFromSquare = exports.getNextTurn = exports.getMoveLogFromActions = exports.createRacksFromActions = exports.createRackFromActions = exports.createPlayCommand = exports.createNewBoard = exports.createBoardFromActions = exports.createBagFromActions = exports.actionChangesTurn = exports.MultiplierType = exports.Multiplier = exports.Letter = exports.ActionType = exports.Rack = exports.Game = exports.Bag = exports.constants = void 0;
    exports.constants = __importStar(constants);
    Object.defineProperty(exports, "Bag", ({ enumerable: true, get: function () { return bag_1.Bag; } }));
    Object.defineProperty(exports, "Game", ({ enumerable: true, get: function () { return game_1.Game; } }));
    Object.defineProperty(exports, "Rack", ({ enumerable: true, get: function () { return rack_1.Rack; } }));
    Object.defineProperty(exports, "ActionType", ({ enumerable: true, get: function () { return actiontype_1.ActionType; } }));
    Object.defineProperty(exports, "Letter", ({ enumerable: true, get: function () { return letter_1.Letter; } }));
    Object.defineProperty(exports, "Multiplier", ({ enumerable: true, get: function () { return multiplier_1.Multiplier; } }));
    Object.defineProperty(exports, "MultiplierType", ({ enumerable: true, get: function () { return multipliertype_1.MultiplierType; } }));
    Object.defineProperty(exports, "actionChangesTurn", ({ enumerable: true, get: function () { return actionchangesturn_1.actionChangesTurn; } }));
    Object.defineProperty(exports, "createBagFromActions", ({ enumerable: true, get: function () { return createbagfromactions_1.createBagFromActions; } }));
    Object.defineProperty(exports, "createBoardFromActions", ({ enumerable: true, get: function () { return createboardfromactions_1.createBoardFromActions; } }));
    Object.defineProperty(exports, "createNewBoard", ({ enumerable: true, get: function () { return createnewboard_1.createNewBoard; } }));
    Object.defineProperty(exports, "createPlayCommand", ({ enumerable: true, get: function () { return createplaycommand_1.createPlayCommand; } }));
    Object.defineProperty(exports, "createRackFromActions", ({ enumerable: true, get: function () { return createrackfromactions_1.createRackFromActions; } }));
    Object.defineProperty(exports, "createRacksFromActions", ({ enumerable: true, get: function () { return createracksfromactions_1.createRacksFromActions; } }));
    Object.defineProperty(exports, "getMoveLogFromActions", ({ enumerable: true, get: function () { return getmovelogfromactions_1.getMoveLogFromActions; } }));
    Object.defineProperty(exports, "getNextTurn", ({ enumerable: true, get: function () { return getnextturn_1.getNextTurn; } }));
    Object.defineProperty(exports, "getPointsFromSquare", ({ enumerable: true, get: function () { return getpointsfromsquare_1.getPointsFromSquare; } }));
    Object.defineProperty(exports, "getScoresFromActions", ({ enumerable: true, get: function () { return getscoresfromactions_1.getScoresFromActions; } }));
    Object.defineProperty(exports, "getTurnFromActions", ({ enumerable: true, get: function () { return getturnfromactions_1.getTurnFromActions; } }));
    Object.defineProperty(exports, "parseAction", ({ enumerable: true, get: function () { return parseaction_1.parseAction; } }));
    Object.defineProperty(exports, "parseBoard", ({ enumerable: true, get: function () { return parseboard_1.parseBoard; } }));
    Object.defineProperty(exports, "parseLetter", ({ enumerable: true, get: function () { return parseletter_1.parseLetter; } }));
    Object.defineProperty(exports, "parsePlayCommand", ({ enumerable: true, get: function () { return parseplaycommand_1.parsePlayCommand; } }));
    Object.defineProperty(exports, "parseSquareCoordinates", ({ enumerable: true, get: function () { return parsesquarecoordinates_1.parseSquareCoordinates; } }));
    Object.defineProperty(exports, "playCommandHasLettersFromRack", ({ enumerable: true, get: function () { return playcommandhaslettersfromrack_1.playCommandHasLettersFromRack; } }));
    Object.defineProperty(exports, "playMove", ({ enumerable: true, get: function () { return playmove_1.playMove; } }));
    Object.defineProperty(exports, "printBoard", ({ enumerable: true, get: function () { return printboard_1.printBoard; } }));
    Object.defineProperty(exports, "createBoardFromStatus", ({ enumerable: true, get: function () { return createboardfromstatus_1.createBoardFromStatus; } }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "knockout":
/*!***********************************!*\
  !*** external {"amd":"knockout"} ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_knockout__;

/***/ }),

/***/ "underscore":
/*!*************************************!*\
  !*** external {"amd":"underscore"} ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_underscore__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scrabblecore.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvY2xhc3Nlcy9iYWcudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2NsYXNzZXMvZ2FtZS50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvY2xhc3Nlcy9yYWNrLnRzIiwid2VicGFjazovL3NjcmFiYmxlY29yZS8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2VudW1zL2FjdGlvbnR5cGUudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2VudW1zL2xldHRlci50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvZW51bXMvbXVsdGlwbGllci50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvZW51bXMvbXVsdGlwbGllcnR5cGUudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2Z1bmN0aW9ucy9hY3Rpb25jaGFuZ2VzdHVybi50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvZnVuY3Rpb25zL2NyZWF0ZWJhZ2Zyb21hY3Rpb25zLnRzIiwid2VicGFjazovL3NjcmFiYmxlY29yZS8uL3NyYy9mdW5jdGlvbnMvY3JlYXRlYm9hcmRmcm9tYWN0aW9ucy50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvZnVuY3Rpb25zL2NyZWF0ZWJvYXJkZnJvbXN0YXR1cy50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvZnVuY3Rpb25zL2NyZWF0ZW5ld2JvYXJkLnRzIiwid2VicGFjazovL3NjcmFiYmxlY29yZS8uL3NyYy9mdW5jdGlvbnMvY3JlYXRlcGxheWNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2Z1bmN0aW9ucy9jcmVhdGVyYWNrZnJvbWFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2Z1bmN0aW9ucy9jcmVhdGVyYWNrc2Zyb21hY3Rpb25zLnRzIiwid2VicGFjazovL3NjcmFiYmxlY29yZS8uL3NyYy9mdW5jdGlvbnMvZ2V0bW92ZWxvZ2Zyb21hY3Rpb25zLnRzIiwid2VicGFjazovL3NjcmFiYmxlY29yZS8uL3NyYy9mdW5jdGlvbnMvZ2V0bmV4dHR1cm4udHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2Z1bmN0aW9ucy9nZXRwb2ludHNmcm9tc3F1YXJlLnRzIiwid2VicGFjazovL3NjcmFiYmxlY29yZS8uL3NyYy9mdW5jdGlvbnMvZ2V0c2NvcmVzZnJvbWFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2Z1bmN0aW9ucy9nZXR0dXJuZnJvbWFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2Z1bmN0aW9ucy9wYXJzZWFjdGlvbi50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvZnVuY3Rpb25zL3BhcnNlYm9hcmQudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2Z1bmN0aW9ucy9wYXJzZWxldHRlci50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvZnVuY3Rpb25zL3BhcnNlcGxheWNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2Z1bmN0aW9ucy9wYXJzZXNxdWFyZWNvb3JkaW5hdGVzLnRzIiwid2VicGFjazovL3NjcmFiYmxlY29yZS8uL3NyYy9mdW5jdGlvbnMvcGxheWNvbW1hbmRoYXNsZXR0ZXJzZnJvbXJhY2sudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL2Z1bmN0aW9ucy9wbGF5bW92ZS50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvLi9zcmMvZnVuY3Rpb25zL3ByaW50Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vc2NyYWJibGVjb3JlLy4vc3JjL3NjcmFiYmxlY29yZS50cyIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvZXh0ZXJuYWwge1wiYW1kXCI6XCJrbm9ja291dFwifSIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvZXh0ZXJuYWwge1wiYW1kXCI6XCJ1bmRlcnNjb3JlXCJ9Iiwid2VicGFjazovL3NjcmFiYmxlY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zY3JhYmJsZWNvcmUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxrQ0FBa0Msb0NBQW9DLGFBQWEsRUFBRSxFQUFFO0FBQ3ZGLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EseUNBQXlDLDZCQUE2QjtBQUN0RSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBTyxDQUFDLG1CQUFTLEVBQUUsT0FBUyxFQUFFLG1EQUFZLEVBQUUsNkRBQWMsQ0FBQyxtQ0FBRTtBQUM3RDtBQUNBLElBQUksOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQ2pFLElBQUksV0FBVztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCw0Q0FBNEMsRUFBRTtBQUN4RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxXQUFXO0FBQ2YsQ0FBQztBQUFBLGtHQUFDOzs7Ozs7Ozs7OztBQ3pFRjtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHlDQUF5Qyw2QkFBNkI7QUFD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NEMsRUFBRSxFQUFFLEVBQUM7QUFDOUksSUFBSSwwREFBeUQsQ0FBQyxxQ0FBcUMsd0RBQXdELEVBQUUsRUFBRSxFQUFDO0FBQ2hLLElBQUksaUVBQWdFLENBQUMscUNBQXFDLHNFQUFzRSxFQUFFLEVBQUUsRUFBQztBQUNyTCxJQUFJLDRDQUEyQyxDQUFDLHFDQUFxQyw0QkFBNEIsRUFBRSxFQUFFLEVBQUM7QUFDdEgsSUFBSSw4Q0FBNkMsQ0FBQyxxQ0FBcUMsZ0NBQWdDLEVBQUUsRUFBRSxFQUFDO0FBQzVILElBQUkseURBQXdELENBQUMscUNBQXFDLHNEQUFzRCxFQUFFLEVBQUUsRUFBQztBQUM3SixDQUFDO0FBQUEsa0dBQUM7Ozs7Ozs7Ozs7OztBQ3BERixzRDs7Ozs7Ozs7Ozs7QUNBQSx3RDs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJzY3JhYmJsZWNvcmUuanMiLCJzb3VyY2VSb290IjoiIn0=