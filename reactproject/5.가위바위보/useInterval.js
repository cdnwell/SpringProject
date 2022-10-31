const React = require('react');
const { useRef, useEffect } = React;

// 기능 -> useInterval(() => {
//              console.log('hello');
//          }, 1000);
// 실제로 실행할 코드, 콜백

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    })

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if(delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        } 
    }, [delay]);

    return savedCallback.current;
}

module.exports = useInterval;