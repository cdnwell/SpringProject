import React, { useCallback, useContext } from 'react';
import { TableContext } from './MineSearch';
import Tr from './Tr';

const Table = () => {
    const { tableData } = useContext(TableContext);
    //TableContext를 넣어주면 value가 나오기 때문에 value.tableData를 가져온 것
    return (
        <table>
            {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
        </table>
    )
};

export default Table;