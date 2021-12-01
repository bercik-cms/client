import { faCross, faFan, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TableFieldData } from '../tableFieldEditor/tableFieldData';
import TableFieldEditor from '../tableFieldEditor/TableFieldEditor';
import styles from "./TableFieldEditorList.module.css";

interface Props {
    fieldDataList: Array<TableFieldData>,
    onDataChange: (index: number, newData: TableFieldData) => void,
    onDeleteField: (index: number) => void,
    onNewField: () => void,
};

const TableFieldEditorList: React.FC<Props> = ({ onNewField, onDataChange, onDeleteField, fieldDataList }) => {

    return <>
        <h2 style={{ marginBottom: ".1rem" }}>Table fields:</h2>
        <div className={styles.container}>
            <div className={styles.fieldList}>
                {fieldDataList.map((fieldData, index) => (
                    <React.Fragment key={index}>
                        <button
                            className={styles.deleteFieldButton}
                            onClick={() => onDeleteField(index)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <TableFieldEditor
                            fieldData={fieldData}
                            onDataChange={newData => onDataChange(index, newData)}
                        />
                    </React.Fragment>
                ))}
            </div>
            <button
                className={styles.newFieldButton}
                onClick={onNewField}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    </>;
};

export default TableFieldEditorList;