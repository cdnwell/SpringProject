const React = require('react');
const { Component } = React;
// import Try from './Try';
const Try = require('./Try');

//-> React.Component를 줄임

function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4;i+=1){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         result : '',
    //         value : '',
    //         answer : getNumbers(),
    //         tries : [],
    //     };
    //     this.onSubmitForm = this.onSubmitForm.bind(this);
    //     this.onChangeInput = this.onChangeInput.bind(this);
    // }

    state = {
        result : '',
        value : '',
        answer : getNumbers(),
        tries : [],
    }
    
    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')){
            this.setState({
                result:'홈런!',
            tries : [...this.state.tries, { try : this.state.value, result : '홈런!'}],
            });
            alert('게임을 다시 시작합니다.');
            this.setState({
                value : '',
                answer : getNumbers(),
                tries : [],
            });
        } else {    // 답 틀렸으면
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {     // 10번 이상 틀렸을 경우
                this.setState({
                    result : `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')} 였습니다!`,
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value : '',
                    answer : getNumbers(),
                    tries : [],
                });
            } else {
                for (let i = 0; i < 4 ; i += 1){
                    if(answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState({
                    tries : [...this.state.tries, {try : this.state.value, result : `${strike} 스트라이크, ${ball} 볼 입니다.`}],
                    value : '',
                });
            }
        }
        console.log(this.state.value);
    }

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value : e.target.value,
        })
    }

    fruits = [
        {fruit : '포도', taste : '맛없다'},
        {fruit : '사과', taste : '맛있다'},
        {fruit : '바나나', taste : '달다'},
        {fruit : '밤', taste : '딱딱하다'},
        {fruit : '귤', taste : '시다'}
    ];

    render() {
        // const { result, value ,tries } = this.state;
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    };
}

module.exports = NumberBaseball;