import React from 'react';
import { tableDataValuesWithLabels, tableDataTypeLabels, TableFieldData } from './tableFieldData';
import styles from './TableFieldEditor.module.css';
import BercikSelect from '../../selectComponent/BercikSelect';

interface Props {
    fieldData: TableFieldData;
    onDataChange: (newData: TableFieldData) => void,
};

const TableFieldEditor: React.FC<Props> = ({ fieldData, onDataChange }) => {
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
                options={tableDataValuesWithLabels}
                selected={{ value: fieldData.type, label: tableDataTypeLabels[fieldData.type] }}
                onSelect={val => onDataChange({ ...fieldData, type: val.value })}
            />
        </div>

        {fieldData.type === "CustomType" &&
            <div className={styles.labelCombo}>
                <label>Custom type</label>
                <input className={styles.textInput} type="text"
                    value={fieldData.customTypeValue}
                    onChange={e => onDataChange({ ...fieldData, customTypeValue: e.target.value })}
                />
            </div>
        }

        {fieldData.type === "ForeignKey" &&
            <div className={styles.labelCombo}>
                <label>References table</label>
                <input className={styles.textInput} type="text"
                    value={fieldData.foreignKeyTableName || "none"}
                    onChange={e => onDataChange({ ...fieldData, foreignKeyTableName: e.target.value })}
                />
            </div>
        }

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
                    checked={fieldData.default !== "None"}
                    onChange={() => onDataChange({
                        ...fieldData,
                        default: fieldData.default === "None" ? { Value: "" } : "None"
                    })}
                />
                {fieldData.default !== "None" &&
                    <input className={styles.textInput} type="text"
                        value={(fieldData.default as { Value: string; }).Value}
                        onChange={e => onDataChange({ ...fieldData, default: { Value: e.target.value } })}
                    />
                }
            </div>
        </div>
    </div>;
};

export default TableFieldEditor;