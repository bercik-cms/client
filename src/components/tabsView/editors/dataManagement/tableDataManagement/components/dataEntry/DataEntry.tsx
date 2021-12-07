import React from 'react';
import SingleValue from './singleValue/SingleValue';
import { ColumnInfo } from '../../../../../../../api/schema/schemaInfo';
import styles from './DataEntry.module.css';

export interface DataEntryValue {
    value: string;
    use_default: boolean;
    use_null: boolean;
}

interface Props {
    columns: Array<ColumnInfo>;
    values: Array<DataEntryValue>;

    onChange: (newValues: Array<DataEntryValue>) => void;
    onInsert: () => void;
}

const DataEntry: React.FC<Props> = ({
    columns,
    values,
    onChange,
    onInsert,
}) => {
    return (
        <div className={styles.mainContainer}>
            <p className={styles.titleP}>Inserting values</p>
            {columns.map((column, index) => (
                <SingleValue
                    key={index}
                    columnInfo={column}
                    valueMap={values[index]}
                    onChange={(newVal) =>
                        onChange([
                            ...values.slice(0, index),
                            newVal,
                            ...values.slice(index + 1, values.length),
                        ])
                    }
                />
            ))}

            <button className={styles.insertButton} onClick={() => onInsert()}>
                Insert
            </button>
        </div>
    );
};

export default DataEntry;
