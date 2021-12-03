import React, { useEffect, useState } from 'react';
import { EditorComponentProps } from '../../editors';
import TableFieldEditor from '../../../../formComponents/tableFieldEditor/TableFieldEditor';
import styles from './TableCreation.module.css';
import { defaultTableFieldData, TableFieldData, tableFieldsToApiJson } from '../../../../formComponents/tableFieldEditor/tableFieldData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TableFieldEditorList from '../../../../formComponents/tableFieldEditorList/TableFieldEditorList';
import axios from 'axios';
import MessageComponent, { MessageComponentProps } from '../../../../messageComponent/MessageComponent';

interface Props extends EditorComponentProps {

};

const TableCreation: React.FC<Props> = ({ onChangeTabSubtitle }) => {
    let [newTableName, setNewTableName] = useState("");
    let [tableFields, setTableFields] = useState<Array<TableFieldData>>([]);

    let [message, setMessage] = useState<null | MessageComponentProps>(null);

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

    function onSubmit() {
        let apiTableFields = tableFieldsToApiJson(tableFields);

        axios.post("/api/create-table", { table_name: newTableName, table_fields: apiTableFields })
            .then(res => {
                setMessage({ success: true, message: "Successfully created table" });
            }).catch(err => {
                setMessage({ success: false, message: err.response.data });
            });
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

        {message !== null && <MessageComponent {...message} />}

        <button onClick={onSubmit} className={styles.submitButton}>
            Submit
        </button>
    </div>;
};

export default TableCreation;