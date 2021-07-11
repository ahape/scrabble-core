import * as _ from "underscore";
import { Game } from "../src/classes/game";
import { parseBoard } from "../src/functions/parseboard";

const game001 = JSON.parse(
    `{"id":"52ce6533-edd6-48a1-abab-5c9e1c254f6c","actions":["NEW_GAME","DRAW NUBELRX","PLAY LUBE H8 H","DRAW VGOIZGY","PLAY VIZE K5 V","DRAW HUEN","PLAY HEX G7 H","DRAW AOP","PLAY PIGGY J6 H","DRAW HTS","PLAY HUNTS D9 H","DRAW VEAI","PLAY HOOVE D9 V","DRAW IBERS","PLAY BERRY N2 V","DRAW NNCR","PLAY NICER A13 H","DRAW NOWI","PLAY SNOW A12 V","DRAW DTEO","PLAY DATE K9 H","DRAW PTJ","PLAY JET M3 H","DRAW ?ECA","PLAY CAsE O7 V","DRAW ST","PLAY PINTS K11 H","DRAW FL?N","PLAY LOAF I12 H","DRAW EEMWO","PLAY WINE A15 H","DRAW EOII","PLAY NITE O1 V","DRAW IFU","PLAY WOOF B11 H","DRAW RQO","PLAY NORE L4 H","DRAW AOE","PLAY TEAM N11 V","DRAW LY","PLAY QAt M13 H","DRAW GRA","PLAY tAG O13 V","DRAW AA","PLAY RAW B9 V","DRAW UA","PLAY LURE I12 V","DRAW DD","PLAY DELAY H15 H","DRAW SAD","PLAY SOD A8 V","DRAW RMLT","PLAY MOTH G4 V","DRAW TKE","PLAY KITE H1 V","DRAW IEI","PLAY RELIMED C4 H","PLAY ALA E3 V","PLAY KI H1 H","PLAY NU F9 V","GAME_OVER 0"],"actionIndex":60,"teams":2}`
);
const game002 = JSON.parse(
    `{"id":"8da5a63a-7f78-43ee-a563-ca579894d91c","teams":2,"actions":["NEW_GAME","DRAW DI?NLEC","PLAY DECLINe B8 H","DRAW OEJIVUO","PLAY JUVIe H4 V","DRAW PMGIEEH","PLAY LIMP E8 V","DRAW AADO","PLAY JADE H4 H","DRAW BEN","PLAY BEEP B11 H","DRAW UGS","PLAY GOOS L1 V","DRAW ORE","PLAY BONER B11 V","DRAW NRAK","PLAY GUNK L1 H","DRAW EQAR","PLAY QUEER G5 H","DRAW ERS","PLAY ARREARS A15 H","DRAW NNRT","PLAY HANGS G11 V","DRAW OEAGDE","PLAY GOOD B5 V","DRAW DEOA","PLAY RODENT J2 V","DRAW WXU","PLAY AX H11 V","DRAW YAIN","PLAY NADE I9 V","DRAW ZW","PLAY WAZED H10 H","DRAW USI?","PLAY YEA C7 V","DRAW ISAE","PLAY WEE K11 H","DRAW HO","PLAY SHOo N11 V","DRAW III","SWAP IIIIU FLTFL","DRAW TITL","PLAY TITI L15 H","PLAY SOFT A12 H","DRAW PIMR","PLAY GULP B5 H","DRAW IIO","PLAY FAIL K9 H","DRAW VCA","PLAY ORCA L3 H","DRAW TUYB","PLAY BOY M8 H","DRAW T","PLAY VIN E13 H","PLAY TULIP E1 V","GAME_OVER 0"],"actionIndex":55}`
);

const game = new Game();

describe("game", () => {
    describe("#status", () => {
        it("should return the current status for the game, when given no arguments", () => {
            game.load(game001);

            const literal = {
                teamTurn: 2,
                racks: [[], ["I"]],
                scores: [270, 308],
                gameOver: true,
            };

            const paredStatus = _.pick(game.status(), [
                "teamTurn",
                "racks",
                "scores",
                "gameOver",
            ]);

            console.assert(_.isEqual(paredStatus, literal));
        });

        it("should return the current status for the game, when given a specific action index", () => {
            game.load(game001);

            const actionIndex = game.actions.length - 3;

            const literal = {
                bag: [],
                teamTurn: 1,
                racks: [["U"], ["I"]],
                scores: [265, 309],
                gameOver: false,
            };

            const paredStatus = _.pick(game.status(actionIndex), [
                "bag",
                "teamTurn",
                "racks",
                "scores",
                "gameOver",
            ]);

            // console.log(paredStatus);

            console.assert(_.isEqual(paredStatus, literal));
        });
    });
});

describe("game001", () => {
    it("completes without any errors", () => {
        let errorMessage = "";

        try {
            game.load(game001);
        } catch (err) {
            errorMessage = err.message;
        }

        console.assert(errorMessage === "");
    });

    it("loads the correct bag state", () => {
        game.load(game001);

        const tilesLeft = game.status().bag.length;

        console.assert(tilesLeft === 0);
    });

    it("loads the correct board state", () => {
        game.load(game001);

        const board = parseBoard(`
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1|"| | |.| | | |K|I| | |.| | |N|0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| |'| | | |:| |I| |:| | | |B|I|1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | |'| |A| |.|T|.| | | |J|E|T|2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4|.| |R|E|L|I|M|E|D| | |N|O|R|E|3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | |A| |O| | | |V| | |R| |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| |:| | | |:|T| | |P|I|G|G|Y| |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | |.| | | |H|E|X| |Z| |.| |C|6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8|S| | |.| | | |L|U|B|E|.| | |A|7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9|O|R|.|H|U|N|T|S|.| |D|A|T|E|s|8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10|D|A| |O| |U| | | |:| | | |:|E|9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| |W|O|O|F| | | | | |P|I|N|T|S|10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12|S| | |V| | | |.|L|O|A|F| |E|.|11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13|N|I|C|E|R| |.| |U| | | |Q|A|t|12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14|O|'| | | |:| | |R|:| | | |M|A|13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15|W|I|N|E| | | |D|E|L|A|Y| | |G|14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4`);

        console.assert(_.isEqual(board, game.board()));
    });

    it("loads the correct team turn", () => {
        game.load(game001);

        console.assert(game.status().teamTurn === 2);
    });

    it("loads the correct racks", () => {
        game.load(game001);

        const racks = [[], ["I"]];

        console.assert(_.isEqual(racks, game.status().racks));
    });

    it("loads the correct scores", () => {
        game.load(game001);

        const scores = [270, 308];

        console.assert(_.isEqual(scores, game.status().scores));
    });
});

describe("game002", () => {
    it("completes without any errors", () => {
        let errorMessage = "";

        try {
            game.load(game002);
        } catch (err) {
            errorMessage = err.message;
        }

        console.assert(errorMessage === "");
    });

    it("loads the correct bag state", () => {
        game.load(game002);

        const tilesLeft = game.status().bag.length;

        console.assert(tilesLeft === 0);
    });

    it("loads the correct board state", () => {
        game.load(game002);

        const board = parseBoard(`
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1|"| | |.|T| | |"| | | |G|U|N|K|0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| |'| | |U|:| | | |R| |O| |'| |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | |'| |L| |.| |.|O| |O|R|C|A|2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4|.| | |'|I| | |J|A|D|E|S| | |.|3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| |G|U|L|P| |Q|U|E|E|R| | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| |O| | | |:| |V| |N| | | |:| |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| |O|Y| | | |.|I|.|T| | |.| | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8|"|D|E|C|L|I|N|e| | | |.|B|O|Y|7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | |A| |I| |.| |N| |F|A|I|L| |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| |:| | |M|:| |W|A|Z|E|D| |:| |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| |B|E|E|P| |H|A|D| |W|E|E|S| |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12|S|O|F|T| | |A|X|E| | |'| |H|.|11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| |N|'| |V|I|N| |.| | | |'|O| |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| |E| | | |:|G| | |:| | | |o| |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15|A|R|R|E|A|R|S|"| | | |T|I|T|I|14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4`);

        console.assert(_.isEqual(board, game.board()));
    });

    it("loads the correct team turn", () => {
        game.load(game002);

        console.assert(game.status().teamTurn === 1);
    });

    it("loads the correct racks", () => {
        game.load(game002);

        const racks = [["I", "M", "T"], []];

        console.assert(_.isEqual(racks, game.status().racks));
    });

    it("loads the correct scores", () => {
        game.load(game002);

        const scores = [281, 336];

        console.assert(_.isEqual(scores, game.status().scores));
    });
});
