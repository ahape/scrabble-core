import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import * as readline from "readline";
import { parseBoard } from "../src/functions/parseboard";
import { printBoard } from "../src/functions/printboard";
import { parsePlayCommand } from "../src/functions/parseplaycommand";
import { createNewBoard } from "../src/functions/createnewboard";
import { playMove } from "../src/functions/playmove";
import { Game } from "../src/classes/game";
import { IGameState } from "../src/interfaces/igamestate";

const game = new Game();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log(
    "Commands are:" +
        "\t\n'play <word> <coordnates> <direction>' -- example: 'play WORD H8 V'" +
        "\t\n'swap <letters>' -- example: 'swap EEE'" +
        "\t\n'import <file from `saved/`>' -- example: 'import example_file.json'" +
        "\t\n'undo' -- undoes action" +
        "\t\n'redo' -- redoes action" +
        "\t\n'skip' -- skips turn" +
        "\t\n'draw' -- draws tiles from bag onto rack" +
        "\t\n'snapshot' -- show snapshot of game state" +
        "\t\n'status' -- show status for game" +
        "\t\n'print' -- prints all game information" +
        "\n\n"
);

/*
game.currentStatus.subscribe((status) => {
    console.log(status, game.snapshot());
});
*/

function gameLoop() {
    rl.question("What's next? ", (answer) => {
        if (answer.search(/play/i) === 0) {
            try {
                game.play(answer);
                game.print();
            } catch (err) {
                console.log(err);
            }
        } else if (answer.search(/print/i) === 0) {
            game.print();
        } else if (answer.search(/snapshot/i) === 0) {
            console.log(game.snapshot());
        } else if (answer.search(/status/i) === 0) {
            console.log(game.status());
        } else if (answer.search(/undo/i) === 0) {
            game.undo();
            game.print();
        } else if (answer.search(/redo/i) === 0) {
            game.redo();
            game.print();
        } else if (answer.search(/skip/i) === 0) {
            game.skip();
            game.print();
        } else if (answer.search(/draw/i) === 0) {
            game.draw();
            game.print();
        } else if (answer.search(/swap/i) === 0) {
            game.swap(answer);
            game.print();
        } else if (answer.search(/import /i) === 0) {
            const fileName = answer.split(" ")[1];
            const fileRaw = fs.readFileSync(
                path.resolve(__dirname, "./saved/" + fileName)
            );

            game.load(JSON.parse(fileRaw.toString()));

            console.log("Imported game state " + fileName);
        } else {
            console.log("Unknown command");
        }

        gameLoop();
    });
}

game.print();

// Kick off
gameLoop();
