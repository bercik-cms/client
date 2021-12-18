import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './TestingDataEditor.module.css';

interface Props {
    dataMap: { [key: string]: string };
    onChange: (newMap: { [key: string]: string }) => void;
}

const TestingDataEditor: React.FC<Props> = ({ dataMap, onChange }) => {
    let [newKeyName, setNewKeyName] = useState('');

    function onAddKey() {
        if (newKeyName === '') return;
        onChange({ ...dataMap, [newKeyName]: '' });
        setNewKeyName('');
    }

    function onChangeValue(key: string, value: string) {
        onChange({ ...dataMap, [key]: value });
    }

    function onDeleteKey(key: string) {
        let newMap = { ...dataMap };
        delete newMap[key];
        onChange(newMap);
    }

    return (
        <div>
            <h3>Testing data</h3>
            <div className={styles.newKeyDiv}>
                <p>New key: </p>
                <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                />
                <button disabled={newKeyName === ''} onClick={() => onAddKey()}>
                    Add key
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ opacity: '0' }}>
                            <FontAwesomeIcon icon={faTimes} />
                        </th>
                        <th style={{ minWidth: '5rem' }}>Key</th>
                        <th style={{ width: '100%' }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(dataMap).map(([key, value], index) => (
                        <tr key={index}>
                            <td>
                                <button
                                    className={styles.delKeyButton}
                                    onClick={() => onDeleteKey(key)}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </td>
                            <td>{key}</td>
                            <td className={styles.valueCell}>
                                <input
                                    className={styles.tableTextInput}
                                    type="text"
                                    value={value}
                                    onChange={(e) =>
                                        onChangeValue(key, e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestingDataEditor;
