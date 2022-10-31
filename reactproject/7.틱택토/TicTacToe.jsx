import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
    winner : '',
    turn : 'O',
    tableData : [['','',''], ['','',''], ['','','']],
    recentCell : [-1, -1],  // 최근 눌렀던 칸을 기억함.
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    // 위와 같이 두 개의 매개변수를 받고
    // reducer 안에서 state를 어떻게 바꿀지 적어주는 것이다.
    switch(action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 하면 안됨
            // 항상 새로운 객체를 만들어서 바뀐 값만 만들어 주어야 함.
            return {
                ...state,   // 객체를 복사하는 spread 문법, 
                // 기존 state가 얕은 복사가 됨. 복사를 하고 바뀔 부분만
                // 새롭게 바꿔주는 -> 불변성
                // useState, setState할 때 다 똑같이 함 -> 기존 state x
                // 새로운 state 만
                // 기존 state에서 바뀌는 부분만 바꾸고 새로운 state를 만들어서
                // 바꿔주면 알아서 코드가 바뀜.
                winner : action.winner,
            };
        case CLICK_CELL: {
            // 기존의 테이블 데이터를 얕은 복사해줌
            const tableData = [...state.tableData]; 
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,  // tableData에 원하는 부분만 불변성 지키면서
                // 바꾼 것
                recentCell : [action.row, action.cell],
                // 최근에 클릭한 셀 기억
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn : state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME : {
            return {
                ...state,
                turn : 'O',
                tableData : [
                    ['','',''], 
                    ['','',''], 
                    ['','','']
                ],
                recentCell : [-1, -1],
                // 게임을 리셋 함
            };
        }
        default :
            return state;
    }
};

const TicTacToe = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);

    const onClickTable = useCallback(() => {
        dispatch({
            type : SET_WINNER, winner : 'O'
        });
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true;
        }// 가로 줄 검사
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true;
        }// 세로 줄 검사
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }// 대각선 검사
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }// 대각선 검사
        if (win) { // 승리시
            dispatch({ type : SET_WINNER, winner : turn });
            dispatch({ type : RESET_GAME });
        } else {
            // 무승부 검사
            let all = true; // -> all이 true면 무승부라는 뜻
            tableData.forEach((row) => { // 무승부 검사
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                        // 칸이 하나라도 안 차있는게 있으면
                        // all이 false가 된다.
                    }
                });
            });
            if (all) {
                // 무승부
                dispatch({ type : SET_WINNER, winner : null });
                dispatch({ type : RESET_GAME });
            } else {
                // 무승부가 아니면 다음 사람에게 턴을 넘겨주기.
                // 누가 이겼거나 무승부인 경우에는 reset 하면 됨.
                // 게임 reset
                dispatch({ type : CHANGE_TURN });
            }
        }
    }, [recentCell]);
    // tableData가 바뀌었을 때 useEffect가 바뀐다.
    // 클릭 하나 할 때 마다 실행 됨.

    return (
        <>
            <Table onClick = {onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리</div>}
        </>
    );
};

export default TicTacToe;