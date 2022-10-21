// script로 안하고 node의 모듈 시스템 활용
const React = require('react');
// React 반복 되는 것 없애기
const { useState, useRef } = React;

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second){
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setResult(value + ' = 정답!');
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡!');
            setValue('');
            inputRef.current.focus();
        }
    }

    return (
        <>
            <div>{first} 곱하기 {second}는?</div>    
            <form onSubmit={onSubmitForm}>
                <input type="number" ref={inputRef} onChange={onChangeInput} value={value}/>
                <button>제출</button>    
            </form>
            <div>{result}</div>
        </>
    );
}

// 다른데서 쓰이길 원하면 아래를 꼭 붙여주어야 한다.
module.exports = GuGuDan;