import React, { useCallback, memo } from "react";
import { CLICK_CELL } from './TicTacToe';

const Td = memo(( { rowIndex, cellIndex, dispatch, cellData } ) => {
    console.log('td rendered');

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            // 이미 cellData가 있으면 return -> 함수 종료
            return;
        }
        dispatch({
            type: CLICK_CELL,
            row : rowIndex,
            cell : cellIndex,
        });
    }, [cellData]);
    // cellData는 바뀌니깐 배열에 넣어 줌

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;