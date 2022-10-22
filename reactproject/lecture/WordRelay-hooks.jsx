const React = require('react');
// npm에서 react를 불러옴
// 분리할 때 주의사항 *** 쓰이는 것들을 항상 불러와주기 ***
const { Component } = React;

// 쪼갠 파일에서 쓰는 컴포넌트를 바깥에서도 사용할 수 있게 해주는 것

const WordRelayHooks = () => {
    const [word,setWord] = React.useState('스프링');
    const [value,setValue] = React.useState('');
    const [result,setResult] = React.useState('');

    const inputRef = React.useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length-1] === value[0]){
            setWord(value);
            setValue('');
            setResult('정답!');
            inputRef.current.focus();
        } else {
            setValue('');
            setResult('땡!');
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input type="text" ref={inputRef} onChange={onChangeInput} value={value} />
                <button>제출</button>
            </form>
            <div>{result}</div>
        </>
    );
};

// 파일을 쪼개는 경우에는 const와 module...을 항상 붙여주어야 한다.
module.exports = WordRelayHooks;