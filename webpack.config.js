const path = require('path');

// Default
var config = {
        mode: 'development',
        entry: './js/index.js',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'ads.js',
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
    }
;

module.exports = (env, argv) => {

    if (argv.mode === 'production') {
        config.devtool = 'source-map'
    }

    return config;
};