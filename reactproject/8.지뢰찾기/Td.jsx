import React, { useContext } from 'react';
import { CODE, TableContext } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:   //기본칸 일 경우
        case CODE.MINE :
            return {
                background : '#444',
            };
        case CODE.OPENED:
            return {
                background : 'white',
            };
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
        default:
            return '';
    }
};

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData } = useContext(TableContext);

    return (
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;