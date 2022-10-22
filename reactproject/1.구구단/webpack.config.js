const path = require('path');


module.exports = {
    mode : 'development',
    devtool : 'eval',       // production -> hidden-source-map
    // 개발 -> eval
    resolve : {
        extensions : ['.jsx', '.js'],
    },

    entry : {
        app : './client',
    },
    module: {
        rules :[{
            test : /\.jsx?$/,
            loader : 'babel-loader',
            options : {
                // preset-env 자동으로 옛날 브라우저 지원
                presets : [['@babel/preset-env',{
                    targets : {
                        browsers : ['last 2 chrome versions'],
                    },
                }],  '@babel/preset-react'],
                plugins : [],
            },
        }],
    },
    output : {
        filename : 'app.js',
        path : path.join(__dirname, 'dist'),
    },
};