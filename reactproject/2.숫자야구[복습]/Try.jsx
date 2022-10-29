const { useState } = require('react');
const React = require('react');
const { Component, memo } = React;

class Try extends Component{
    // constructor(props){
    //     super(props);
    //     //함수안에 다른 동작을 할 수 있음
    //     const filtered = this.props.filter(() => {
            
    //     });
    //     console.log()
    //     this.state = {
    //         result : this.props.result,
    //         try : this.props.try,
    //     }
    // }
    

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

// const Try = memo(({tryInfo}) => {
//     const [result,setResult] = useState(tryInfo.result);

//     const onClick = () => {
//         setResult('1');
//     };

//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div onClick={onClick}>{result}</div>
//         </li>
//     );
// });
// Try.displayName = 'Try';

module.exports = Try;