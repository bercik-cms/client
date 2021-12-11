import React, { useEffect, useState } from 'react';
import apiInsertData from '../../../../../api/dataManagement/insert';
import {
    getTableData as apiGetTableData,
    GetTableDataRequest,
    TableData,
} from '../../../../../api/dataManagement/table_data';
import getSchemaInfo, { TableInfo } from '../../../../../api/schema/schemaInfo';
import Spinner from '../../../../spinner/Spinner';
import { EditorComponentProps } from '../../editors';
import DataEntry, { DataEntryValue } from './components/dataEntry/DataEntry';
import TableSelector from './components/tableSelector/TableSelector';
import TableView from './components/tableView/TableView';
import styles from './TableDataManagement.module.css';

interface Props extends EditorComponentProps {}

const TableDataManagement: React.FC<Props> = ({}) => {
    let [tableInfo, setTableInfo] = useState<Array<TableInfo> | null>(null);

    let [selectedIndex, setSelectedIndex] = useState(-1);
    let [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);

    let [inputValues, setInputValues] = useState<Array<DataEntryValue> | null>(
        null
    );

    let [getTableDataRequest, setGetTableDataRequest] =
        useState<GetTableDataRequest | null>(null);

    let [tableData, setTableData] = useState<TableData | null>(null);

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

    useEffect(() => {
        if (selectedTable === null) return;

        let shouldOverride =
            getTableDataRequest === null ||
            getTableDataRequest.table_name !== selectedTable.table_name;

        if (shouldOverride)
            setGetTableDataRequest({
                table_name: selectedTable.table_name,
                where_clause: { type: 'None' },
                sorting: { type: 'None' },
            });
    }, [selectedTable]);

    useEffect(() => {
        if (getTableDataRequest === null) return;
        apiGetTableData(getTableDataRequest).then((data) => setTableData(data));
    }, [getTableDataRequest]);

    function onInputValuesChange(newVals: Array<DataEntryValue>) {
        setInputValues(newVals);
    }

    function onInsert() {
        apiInsertData(selectedTable!.table_name, inputValues!).then(() => {
            // Reload data after insert
            if (getTableDataRequest !== null)
                setGetTableDataRequest({ ...getTableDataRequest });
        });
    }

    function onAscending(columnIndex: number) {}

    function onDescending(columnIndex: number) {}

    function onDelete(rowIndex: number) {}

    function onEdit(rowIndex: number) {}

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

            {tableData !== null && (
                <TableView
                    headers={tableData.names}
                    rows={tableData.rows}
                    onAscending={onAscending}
                    onDescending={onDescending}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
};

export default TableDataManagement;
