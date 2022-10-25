const React = require('react');
const { Component } = React;

class Try extends Component{
    render(){
        //try, result
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}