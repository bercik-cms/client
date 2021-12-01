import React, { useEffect, useState } from 'react';
import { EditorComponentProps } from '../../editors';
import TableFieldEditor from '../../../../formComponents/tableFieldEditor/TableFieldEditor';
import styles from './TableCreation.module.css';
import { defaultTableFieldData, TableFieldData } from '../../../../formComponents/tableFieldEditor/tableFieldData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TableFieldEditorList from '../../../../formComponents/tableFieldEditorList/TableFieldEditorList';

interface Props extends EditorComponentProps {

};

const TableCreation: React.FC<Props> = ({ onChangeTabSubtitle }) => {
    let [newTableName, setNewTableName] = useState("");
    let [tableFields, setTableFields] = useState<Array<TableFieldData>>([]);

    function onTableNameChange(newName: string) {
        setNewTableName(newName);
        onChangeTabSubtitle(newName);
    }

    useEffect(() => onTableNameChange("new_table"), []);

    function onTableDataChange(index: number, newData: TableFieldData) {
        setTableFields([
            ...tableFields.slice(0, index),
            newData,
            ...tableFields.slice(index + 1, tableFields.length)
        ]);
    }

    function onNewTableField() {
        setTableFields([...tableFields, defaultTableFieldData]);
    }

    function onDeleteTableField(index: number) {
        setTableFields([
            ...tableFields.slice(0, index),
            ...tableFields.slice(index + 1, tableFields.length)
        ]);
    }

    return <div className={styles.container}>
        <label>New table name:</label><br />
        <input
            className={styles.nameTextInput}
            type="text"
            value={newTableName}
            onChange={e => onTableNameChange(e.target.value)}
        />

        <TableFieldEditorList
            fieldDataList={tableFields}
            onDataChange={onTableDataChange}
            onNewField={onNewTableField}
            onDeleteField={onDeleteTableField}
        />
    </div>;
};

export default TableCreation;