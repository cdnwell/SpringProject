const path = require('path');

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
                plugins : ['@babel/plugin-proposal-class-properties'],
            }

        }],
    },
    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
    },

};