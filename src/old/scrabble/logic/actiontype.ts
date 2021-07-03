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
    EndGame = "GAME_OVER",
}
