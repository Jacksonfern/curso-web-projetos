require('dotenv/config');
const mode = process.env.MODE === "development";
const path = require('path');

const copyPlugin = require('copy-webpack-plugin');

const htmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
    mode: (mode ? "development" : "production"),
    entry: "./src/index.js",
    output: {
        filename: "app.min.js",
        path: path.resolve(__dirname, "public"),
    },
    module: {
        rules: [
            {
                test: /\.html/g,
                loader: 'html-loader',
            }
        ]
    },
    plugins: [
        new copyPlugin({
            patterns: [
                { context: "src/html/", from: '**/*.html' },
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new htmlMinimizerPlugin(),
        ],
    }
}