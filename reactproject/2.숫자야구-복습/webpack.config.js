const path = require('path');
const RefreshWebpack = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = { 
    name : 'NumberBaseball',
    mode : 'development',
    devtool : 'eval',
    resolve : {
        extensions : ['.js', '.jsx'],
    },
    entry : {
        app : ['./client'],
    },
    module : {
        rules : [{
            test : /\.jsx?/,
            loader : 'babel-loader',
            options : {
                preset : ['@babel/preset-env', '@babel/preset-react'],
                plugins : ['@babel/plugin-proposal-class-properties', 'react-refresh/babel'],
            }
        }],
    },
    plugins : [
        new RefreshWebpack()
    ],
    output : {
        path : path.join(__dirname,'dist'),
        filename : 'app.js',
        publicPath : '/dist/',
    },
    devServer : {
        devMiddleware : {publicPath : '/dist'},
        static : {directory : path.resolve(__dirname)},
        hot : true
    }
};