const React = require('react');
const { Component } = React;
//-> React.Component를 줄임

class NumberBaseball extends Component{
    state = {
        text : 'hello, webpack'
    };

    render() {
        return (
            <>
                <h1>{this.state.text}</h1>
            </>
        );
    };
}

module.exports = NumberBaseball;