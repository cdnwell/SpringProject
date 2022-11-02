import React, { useState, useEffect, useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAG_MINE : -5,
    CLICKED_MINEE : -6, //실수로 지뢰 칸을 클릭한 경우
    OPENED : 0, //정상적으로 연 칸
    // 0 이상이면 다 opened가 되게, 0만 의도적으로 만듦.
};

export const TableContext = createContext({
    tableData : [],
    halted : true,
    dispatch : () => {},
});

const initialState = {
    tableData : [],
    timer : 0,
    result : '',
    halted : false,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    //0부터 99까지 숫자가 됨 10 * 10일 경우
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);   
    }//0부터 99까지 지뢰가 20개면 20개의 숫자를 랜덤으로 뽑아 놓고 shuffle 배열에
    //저장함, shuffle에 몇 번 째 칸에 지뢰가 있는지 20개가 뽑힘
    const data = [];
    for (let i =0;i<row;i++){
        const rowData = []; //2차원 배열 만드는 것
        data.push(rowData);
        for(let j=0;j<cell;j++){
            rowData.push(CODE.NORMAL);
        }
    }

    //지뢰 심기, shuffle에 몇번째 칸에 지뢰 심을지 적어놓음
    for(let k=0;k<shuffle.length;k++){
        //몇 콤마 몇인지 계산하기 위한 코드
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
    //심은 칸들이 tableData에 심어짐
};

export const START_GAME = 'START_GAME'; // 액션 이름을 만듦
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
    switch(action.type) {
        case START_GAME:
            return {
                ...state,
                tableData : plantMine(action.row, action.cell, action.mine),
                halted : false,
            };
        case OPEN_CELL: {
            const tableData = [...state,tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
                // 모든 칸들을 새로운 객체로 만들어 줌.
            });
            const checkAround = ( row, cell ) => {
                
            };
            //클릭한 셀이 opened 로 바뀜
            let around = [];
            if (tableData[action.row - 1]){
                around = around.concat(
                    tableData[action.row - 1][action.cell - 1], 
                    tableData[action.row - 1][action.cell],
                    tableData[action.row - 1][action.cell + 1]
                );
            }
            around = around.concat(
                tableData[action.row][action.cell - 1],
                tableData[action.row][action.cell + 1]
            );
            if (tableData[action.row + 1]) {
                around = around.concat(
                    tableData[action.row + 1][action.cell - 1], 
                    tableData[action.row + 1][action.cell],
                    tableData[action.row + 1][action.cell + 1]
                );
            }
            // 주변 8칸 중에서 지뢰인 칸을 세는 것
            const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
            tableData[action.row][action.cell] = count;
            if (count === 0) {

            } else {

            }
            return {
                ...state,
                tableData,
            };
        }
        case CLICK_MINE : {
            const tableData = [...state,tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            return {
                ...state,
                tableData,
                halted : true,
            }
        }
        case FLAG_CELL : {
            const tableData = [...state,tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if ( tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL : {
            const tableData = [...state,tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if ( tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL : {
            const tableData = [...state,tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if ( tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    const value = useMemo((() => ({ tableData : tableData, halted : halted, dispatch }), [tableData]);

    return (
        <TableContext.Provider value={ value }>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;