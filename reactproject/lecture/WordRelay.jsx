const React = require('react');
// npm에서 react를 불러옴
// 분리할 때 주의사항 *** 쓰이는 것들을 항상 불러와주기 ***
const { Component } = React;

// 쪼갠 파일에서 쓰는 컴포넌트를 바깥에서도 사용할 수 있게 해주는 것
class WordRelay extends React.Component{
    state = {
        text : 'Hello, webpack',
    };

    render(){
        return (
            <h1>{this.state.text}</h1>
        );
    };
}

// 파일을 쪼개는 경우에는 const와 module...을 항상 붙여주어야 한다.
module.exports = WordRelay;