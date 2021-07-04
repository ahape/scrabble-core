const path = require("path");

module.exports = {
    devtool: "inline-nosources-source-map",
    entry: "./src/scrabblecore.ts",
    mode: "development",
    // NOTE: This is specific to the 'scrabble' app
    externals: {
        _: "../lib/underscore.js",
        ko: "../lib/knockout.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts"],
    },
    output: {
        filename: "scrabblecore.js",
        path: path.resolve(__dirname, "build"),
        library: {
            name: "scrabblecore",
            type: "umd",
        },
    },
};
