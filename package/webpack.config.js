const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: './source/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'distribution'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [
            '/package/node_modules',
            '/package/external'
        ]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};