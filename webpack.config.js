const path = require("path");

module.exports = {
    devtool: "inline-nosources-source-map",
    entry: "./src/index.ts",
    mode: "development",
    module: {
        rules: [
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
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
    },
};
