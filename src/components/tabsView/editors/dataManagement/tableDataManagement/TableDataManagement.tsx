import React, { useEffect, useState } from 'react';
import apiInsertData from '../../../../../api/dataManagement/insert';
import getSchemaInfo, { TableInfo } from '../../../../../api/schema/schemaInfo';
import Spinner from '../../../../spinner/Spinner';
import { EditorComponentProps } from '../../editors';
import DataEntry, { DataEntryValue } from './components/dataEntry/DataEntry';
import TableSelector from './components/tableSelector/TableSelector';
import styles from './TableDataManagement.module.css';

interface Props extends EditorComponentProps {}

const TableDataManagement: React.FC<Props> = ({}) => {
    let [tableInfo, setTableInfo] = useState<Array<TableInfo> | null>(null);

    let [selectedIndex, setSelectedIndex] = useState(-1);
    let [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);

    let [inputValues, setInputValues] = useState<Array<DataEntryValue> | null>(
        null
    );

    useEffect(() => {
        getSchemaInfo().then((info) => setTableInfo(info));
    }, []);

    useEffect(() => {
        setInputValues(null);
        if (selectedIndex === -1) setSelectedTable(null);
        else setSelectedTable(tableInfo![selectedIndex]);
    }, [selectedIndex]);

    useEffect(() => {
        let res: Array<DataEntryValue> = [];
        if (selectedTable === null) return;
        for (let column of selectedTable.columns) {
            res.push({
                value: '',
                use_default: column.column_default !== '',
                use_null: false,
            });
        }
        setInputValues(res);
    }, [selectedTable]);

    function onInputValuesChange(newVals: Array<DataEntryValue>) {
        setInputValues(newVals);
    }

    function onInsert() {
        apiInsertData(selectedTable!.table_name, inputValues!);
    }

    if (tableInfo === null) return <Spinner />;

    return (
        <div>
            <div className={styles.tableSelector}>
                <h2>Managing table</h2>
                <TableSelector
                    tables={tableInfo}
                    selected={selectedIndex}
                    onSelect={(n) => {
                        setSelectedIndex(n);
                    }}
                />
            </div>

            {selectedTable !== null && inputValues !== null && (
                <DataEntry
                    columns={selectedTable.columns}
                    values={inputValues}
                    onChange={onInputValuesChange}
                    onInsert={onInsert}
                />
            )}
        </div>
    );
};

export default TableDataManagement;
