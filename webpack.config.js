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
                    presets: ['es2015', 'react'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties']
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg)?$/,
                loader: "file-loader?name=images/[name].[ext]"
            },
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
