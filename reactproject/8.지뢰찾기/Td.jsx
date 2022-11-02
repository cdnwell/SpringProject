import React, { useCallback, useContext } from 'react';
import { CODE, OPEN_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:   //기본칸 일 경우
        case CODE.MINE :
            return {
                background : '#444',
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background : 'white',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background : 'yellow',
            }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background : 'red',
            }
        default: 
            return {
                background : 'white',
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X'; // debugging이 편하도록 X 글자 설정
            // 완성품에는 빈칸으로 전달하기.
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
};

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch } = useContext(TableContext);
    // dispatch -> contextApi로 한 번에 보내줌

    const onClickTd = useCallback(() => {
        // 클릭 하면 OPEN_CELL 이벤트가 action이 dispatch 되면서
        // 몇 번째 칸 몇 번째 줄인지가 같이 전달 되서
        // minesearch에서 변경 할 수 있게 됨
        // 데이터가 변경되면 화면은 알아서 변한다.
        if (halted) {
            return;
        }
        switch(tableData[rowIndex][cellIndex]) {
            // 칸 상태별로 클릭 했을 때 동작이 달라져야 한다.
            // 이미 연 칸은 칸을 클릭해도 아무 효과가 없음
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({ type : OPEN_CELL, row : rowIndex, cell : cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type : CLICK_MINE, row : rowIndex, cell : cellIndex });
                return;
        }
        dispatch({ type : OPEN_CELL, row : rowIndex, cell : cellIndex });
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault(); // 오른쪽 클릭하면 메뉴가 뜨는데 그걸 막음
        if(halted){
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type : FLAG_CELL, row : rowIndex, cell : cellIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type : QUESTION_CELL, row : rowIndex, cell : cellIndex });
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type : NORMALIZE_CELL, row : rowIndex, cell : cellIndex });
                return; // 스위치 문은 break든 return이든 항상 끊어주어야 한다.
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    return (
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;