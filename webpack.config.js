var webpack = require('webpack');
module.exports = {
    entry: [
        "./src/js/app.js"
    ],
    output: {
        path: './static',
        filename: "bundle.js"
    },
    devtool: "source-map",
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
                test: /\.( ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)?$/,
                loader: "url-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.json$/,
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
