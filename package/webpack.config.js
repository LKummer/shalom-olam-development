const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: './source/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'distribution'),
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};