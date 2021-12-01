import React from 'react';
import { tableDataSelectValues, tableDataType, TableFieldData } from './tableFieldData';
import styles from './TableFieldEditor.module.css';
import BercikSelect from '../../selectComponent/BercikSelect';

interface Props {
    fieldData: TableFieldData;
    onDataChange: (newData: TableFieldData) => void,
};

const TableFieldEditor: React.FC<Props> = ({ fieldData, onDataChange }) => {
    console.log(fieldData);
    console.log(tableDataType[fieldData.type]);

    return <div className={styles.container}>
        <div className={styles.labelCombo}>
            <label>Field name</label>
            <input className={styles.textInput} type="text"
                value={fieldData.name}
                onChange={e => onDataChange({ ...fieldData, name: e.target.value })}
            />
        </div>
        <div className={styles.labelCombo}>
            <label>Type</label>
            <BercikSelect
                options={tableDataSelectValues}
                selected={{ value: fieldData.type, label: tableDataType[fieldData.type] }}
                onSelect={val => onDataChange({ ...fieldData, type: val.value })}
            />
        </div>
        <div className={styles.labelCombo}>
            <label>Not null</label>
            <input type="checkbox"
                checked={fieldData.notNull}
                onChange={() => onDataChange({ ...fieldData, notNull: !fieldData.notNull })}
            />
        </div>
        <div className={styles.labelCombo}>
            <label>Default value</label>
            <div>
                <input type="checkbox"
                    checked={fieldData.default !== null}
                    onChange={() => onDataChange({ ...fieldData, default: fieldData.default === null ? "" : null })}
                />
                {fieldData.default !== null &&
                    <input className={styles.textInput} type="text"
                        value={fieldData.default || ""}
                        onChange={e => onDataChange({ ...fieldData, default: e.target.value })}
                    />
                }
            </div>
        </div>
    </div>;
};

export default TableFieldEditor;