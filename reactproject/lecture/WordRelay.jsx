const React = require('react');
// npm에서 react를 불러옴
// 분리할 때 주의사항 *** 쓰이는 것들을 항상 불러와주기 ***
const { Component } = React;

// 쪼갠 파일에서 쓰는 컴포넌트를 바깥에서도 사용할 수 있게 해주는 것
class WordRelay extends Component{
    state = {
        word : '스프링',
        value : '',
        result : '',
    };

    // 클래스 메서드는 (내가 직접만드는 것) 항사 화살표 함수
    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
            this.setState({
                word : this.state.value,
                value : '',
                result : '정답!',
            });
            this.input.focus();
        } else {
            this.setState({
                value : '',
                result : '땡!',
            });
            this.input.focus();
        }
    };

    onChangeInput = (e) => {
        this.setState({
            value : e.target.value,
        })
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    };

    render(){
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>버튼</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    };
}

// 파일을 쪼개는 경우에는 const와 module...을 항상 붙여주어야 한다.
module.exports = WordRelay;