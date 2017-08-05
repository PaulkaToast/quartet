const path = require('path');

module.exports = {
    entry: './src/frontend.js',
    output: {
        filename: 'frontend-bundle.js',
        path: path.resolve(__dirname, '..')
    },
    externals: {
        "createjs": "createjs"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',

                loader: 'eslint-loader'
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            }
        ]
    }
};