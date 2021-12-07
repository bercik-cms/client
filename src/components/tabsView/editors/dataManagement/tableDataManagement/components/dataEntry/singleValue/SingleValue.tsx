import React from 'react';
import { ColumnInfo } from '../../../../../../../../api/schema/schemaInfo';
import { DataEntryValue } from '../DataEntry';
import styles from './SingleValue.module.css';

interface Props {
    columnInfo: ColumnInfo;
    valueMap: DataEntryValue;
    onChange: (newVal: DataEntryValue) => void;
}

let inputProps: { [name: string]: any } = {
    integer: { type: 'number', step: '1' },
    real: { type: 'number' },
    'character varying': { type: 'text' },
    date: { type: 'date' },
};

export const SingleValue: React.FC<Props> = ({
    columnInfo,
    valueMap,
    onChange,
}) => {
    return (
        <div className={styles.container}>
            <p>{columnInfo.name}</p>

            {columnInfo.is_nullable && (
                <div className={styles.labelAndInput}>
                    <p>Use null</p>
                    <input
                        type="checkbox"
                        checked={valueMap.use_null}
                        onChange={() =>
                            onChange({
                                ...valueMap,
                                use_null: !valueMap.use_null,
                            })
                        }
                    />
                </div>
            )}

            {columnInfo.column_default !== '' && (
                <div className={styles.labelAndInput}>
                    <p>Use default</p>
                    <input
                        type="checkbox"
                        checked={valueMap.use_default}
                        onChange={() =>
                            onChange({
                                ...valueMap,
                                use_default: !valueMap.use_default,
                            })
                        }
                    />
                </div>
            )}

            <div className={styles.inputFlex}>
                {(() => {
                    if (columnInfo.data_type === 'text') {
                        return (
                            <textarea
                                className={styles.textarea}
                                disabled={
                                    valueMap.use_null || valueMap.use_default
                                }
                                value={valueMap.value}
                                onChange={(e) =>
                                    onChange({
                                        ...valueMap,
                                        value: e.target.value,
                                    })
                                }
                            />
                        );
                    } else if (inputProps[columnInfo.data_type] !== undefined) {
                        return (
                            <input
                                className={styles.textInput}
                                {...inputProps[columnInfo.data_type]}
                                disabled={
                                    valueMap.use_null || valueMap.use_default
                                }
                                value={valueMap.value}
                                onChange={(e) =>
                                    onChange({
                                        ...valueMap,
                                        value: e.target.value,
                                    })
                                }
                            />
                        );
                    }
                })()}
                {columnInfo.special_info?.type === 'PrimaryKey' &&
                    columnInfo.column_default.indexOf('nextval') !== -1 &&
                    valueMap.use_default === false && (
                        <p className={styles.pkeyWarning}>
                            Warning, not using default may cause issues!
                        </p>
                    )}
            </div>
        </div>
    );
};

export default SingleValue;
