const { useState } = require('react');
const React = require('react');
const { Component } = React;

const Ball = require('./Ball');

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
  }// 로또 당첨 번호 7개 뽑기.

class Lotto extends Component{
    state = {
        winNumbers : getWinNumbers(),
        winBalls : [],
        bonus : null,
        redo : false,
    };

    timeouts = [];

    runTimeouts = () => {
        const { winNumbers } = this.state;
        for(let i =0;i<this.state.winNumbers.length - 1 ; i++){
            //당첨공 6개 보여줌, 보너스 공은 빠져야 하니 - 1
            //비동기에 변수 같이 쓰면 클로저 문제 생기는데, let을 쓰면
            //클로저 문제 안생김 ES6 오면서 편해진 것
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        // React에서 state배열에 값을 넣을 때에는 push 하면 안 됨
                        // 예전 state 이용해서 써야함
                        // this.state는 구조분해하는게 보기 좋음
                        winBalls : [...prevState.winBalls, winNumbers[i]],
                    };
                })
            }, (i + 1) * 1000); // 첫 번째 공 1초 뒤 -> 두 번째 공 2초 뒤 ..
        }
        // 당첨 공 6개 했고 보너스 공 하기
        this.timeouts[6] = setTimeout( () => {
            this.setState({
                bonus : winNumbers[6],
                redo : true,
            });
        }, 7000);// redo : true -> 한 번더 버튼이 원래 안보이다가 bonus공까지 다 나오면
        // 버튼 표시
    }
    
    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        const { winBalls } = this.state;
        if (winBalls.length === 0) {
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    };

    // 한 번더 뽑을 때는 기존 state들 초기화 해주어야 함.
    onClickRedo = () => {
        this.setState({
            winNumbers : getWinNumbers(),
            winBalls : [],
            bonus : null,
            redo : false,
        });
        this.timeouts = [];
    };

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
          <>
            <div>당첨 숫자</div>
            <div id="결과창">
              {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
          </>
        );
    };
}

module.exports = Lotto;