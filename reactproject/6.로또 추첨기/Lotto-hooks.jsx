const { useMemo } = require('react');
const React = require('react');
const { useState, useRef, useEffect, useCallback } = React;

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

const Lotto = () => {
    const [winBalls, setWinBalls] = useState([]);
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        console.log('useEffect');
        for(let i =0;i<winNumbers.length - 1 ; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls)=>[...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout( () => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // 빈 배열이면 componentDidMount랑 같다.
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 를 둘 다 수행

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
              {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
          </>
    );
};

module.exports = Lotto;