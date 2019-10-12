const path = require('path');

module.exports = {
    mode: "development",
    entry: './source/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'distribution'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};