var webpack = require('webpack');
module.exports = {
    entry: [
        "./src/js/app.js"
    ],
    output: {
        path: __dirname + '/static',
        filename: "bundle.js"
    },
    // devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']

                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg)?$/,
                loader: "file-loader?name=images/[name].[ext]"
            },
            {
                test: /\.json?$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [],
    watch: false,
    watchOptions: {
        aggregateTimeout: 1000,
        poll: 1000,
        ignored: /node_modules/
    }
};