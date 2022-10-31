const React = require('react');
// const ReactDOM = require('react-dom');
const ReactDOM = require('react-dom/client');

const RockScissorsPaper = require('./RockScissorsPaper-customhooks');

ReactDOM.createRoot(document.querySelector('#root')).render(<RockScissorsPaper/>);
// ReactDOM.render(<RockScissorsPaper />, document.querySelector('#root'));