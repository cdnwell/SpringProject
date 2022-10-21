const React = require('react');
const ReactDOM = require('react-dom');
// node의 시스템 script src 기능과 비슷

// 파일이 2만개 있는데 5개만 쓴다 -> 5개만 불러오면 됨
// 옛날 방식에서는 2만개를 쓰면 5개만 필요하더라도 2만개 다 불러와야
// 됐었음.
const WordRelay = require('./WordRelay');

ReactDOM.render(<WordRelay />, document.querySelector('#root'));
