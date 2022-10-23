const path = require('path');
const RefreshWebpack = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : 'NumberBaseball',
    mode : 'development',
    devtool : 'eval',
    resolve : {
        extensions : ['.js','.jsx'],
    },

    entry : {
        app : ['./client'],

    },

    module : {
        rules : [{
            test : /\.jsx?/,    
            // js파일이랑 jsx파일을 rule을 적용하겠다. 정규표현식
            // loader, babel-lodaer룰을 적용하겠다. -> js, jsx파일에
            // 최신 문법을 옛날 브라우저에도 호환되게 만들겠다.
            loader : 'babel-loader',
            options : {
                presets : ['@babel/preset-env', '@babel/preset-react'],
                plugins : ['@babel/plugin-proposal-class-properties','react-refresh/babel'],
            }

        }],
    },

    plugins : [
        new RefreshWebpack()
    ],

    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
        publicPath : '/dist/',
    },

    devServer : {
        // webpack이 빌드한 파일들이 위치 하는 곳 -> 지금 단계에서는 없지만
        // webpack 명령어가 실행할 때 dist폴더에 생성하므로 devMiddleware에 전달
        devMiddleware : {publicPath : '/dist'},

        // 실제로 존재하는 정적 파일들의 경로 -> static에 적어주면 됨
        // index.html이 다른 폴더(src)에 들어있으면 path.resolve(__dirname,'src')
        // 최상위 폴더, 같은 폴더에 있으므로 생략
        static : {directory : path.resolve(__dirname)},
        hot : true
    },

};