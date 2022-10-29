const React = require('react');

const { render } = require('react-dom');
const { useState } = React;

const Try = require('./Try');

function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(i = 0; i <4;i++){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i )), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result,setResult] = useState('');
    const [value,setValue] = useState('');
    const [answer,setAnswer] = useState(getNumbers);
    const [tries,setTries] = useState([]);

    const onChangeInput = (e) => {
        console.log(answer);
        setValue(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (answer.join('') === value){
            setResult('홈런!');
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries((prevTries) => {
                return [...prevTries, { try : value, result : '홈런!' }];
            }); //hooks에서도 옛날 것을 현재 것으로 만들어 주기 때문에
            //함수형 쓰기
            setTries([]);
        } else {
            const answerArray = value.split('').map(v => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){
                setResult(`10번 넘게 틀리셨습니다. 답은 ${answer} 였습니다.`);
                setValue('');
                setTries([]);
                setAnswer(getNumbers());
            } else {
                for(i=0;i<4;i++){
                    if(answer[i] === answerArray[i]){
                        strike += 1;
                    } else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                setTries((prevTries) => [...tries, {try : value, result : `${strike} 스트라이크 ${ball} 볼`}]);
                setValue('');
            }
        }
    }

    return (
        <>
            <div>{result}</div>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} type="text" value={value} onChange={onChangeInput} />
            </form>
            <div>{tries.length}번째 시도</div>
            <ul>
                {tries.map((v,i) => {
                    return <Try key={`${i + 1}번째 시도`} tryInfo={v} />
                })}
            </ul>
        </>
    );

}

module.exports = NumberBaseball;