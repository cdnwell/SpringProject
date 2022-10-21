const path = require('path');
// path -> node에서 경로 쉽게 조작하도록 변수를 줌.
// node가 설치되어있으면 자동으로 path 변수 값을 등록해준다.

module.exports = {
    name : 'wordrelay-setting',
    mode : 'development',   // 실서비스 : production
    devtool : 'eval',       // 빠르게 하겠다.
    resolve : {
        extensions : ['.js', '.jsx']
    },

    // entry와 output이 가장 중요하다.
    entry : {
        app : ['./client'],
    },  // 입력

    module : {
        // rule는 여러 개의 규칙을 적용할 수 있어 배열이다.
        rules : [{
            options : {
                presets : ['@babel/preset-env', '@babel/preset-react'],
                plugins : ['@babel/plugin-proposal-class-properties'],
            },
            // js파일과 jsx 파일에 rule을 적용하겠다.
            test : /\.jsx?/,
            loader : 'babel-loader',
            
        }],
    },

    output : {
        // path.join-> 경로 합침, __dirname = 현재 폴더 경로
        // dist -> 현재 폴더 안에 있는 폴더
        path : path.join(__dirname, 'dist'),    // dist까지의 경로
        filename : 'app.js',
    },  // 출력
};