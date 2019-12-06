const path = require('path');

module.exports = {
    entry: './js/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'script.js',
        library: "ads", // The name of the global variable
        libraryTarget: "umd"
    },
    devServer: {
        contentBase: './dist',
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        jquery: "jQuery"
    }
};