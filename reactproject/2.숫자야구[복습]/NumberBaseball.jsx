const React = require('react');
const { Component } = React;

const Try = require('./Try');

function getNumbers(){
    let candidate = [1,2,3,4,5,6,7,8,9];
    let array = [];
    for(i = 0 ; i < 4; i++){
        let chosen = candidate.splice(Math.floor(Math.random() * (9 - i)),1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result : '',
        value : '',
        answer : getNumbers(),
        tries : [],
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){
            this.setState((prevState) => {
                return {
                    result : '홈런!',
                    tries : [...prevState, {try : value, result : '홈런!'}],
                }
            });
            alert('게임을 다시 시작합니다.');
            this.setState({
                value : '',
                tries : [],
                answer : getNumbers(),
            });
        } else {
            let answerArray = this.state.value.split('').map(v => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9){
                this.setState({
                    result : `10번 넘게 틀리셨습니다. 답은 ${this.state.answer}이었습니다.`,
                    value : '',
                    tries : [],
                    answer : getNumbers(),
                });
            } else {
                for(i=0;i<4;i++){
                    if(this.state.answer[i] === answerArray[i]){
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }

                this.setState((prevState) => {
                    return {
                        tries : [...prevState.tries, {try : this.state.value, result : `${strike} 스트라이크 ${ball} 볼`}],
                        value : '',
                    }
                });
            }
        }
    }

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value : e.target.value,
        });
    }

    render(){
        return (
            <>
                <div>{this.state.result}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>{this.state.tries.length}번 시도</div>
                <ul>
                    {this.state.tries.map((v,i)=>{
                        return <Try key={`${i + 1}번째 시도`} tryInfo={v} />;
                    })}
                </ul>
            </>
        );
    }
}

module.exports = NumberBaseball;