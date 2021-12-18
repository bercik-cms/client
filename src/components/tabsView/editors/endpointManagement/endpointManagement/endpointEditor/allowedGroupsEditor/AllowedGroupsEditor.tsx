import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './AllowedGroupsEditor.module.css';

interface Props {
    allowedGroups: Array<string>;
    onChange: (newGroups: Array<string>) => void;
}

const AllowedGroupsEditor: React.FC<Props> = ({ allowedGroups, onChange }) => {
    let [newGroup, setNewGroup] = useState('');

    function onDeleteGroup(index: number) {
        onChange([
            ...allowedGroups.slice(0, index),
            ...allowedGroups.slice(index + 1, allowedGroups.length),
        ]);
    }

    function onAddGroup() {
        onChange([...allowedGroups, newGroup]);
        setNewGroup('');
    }

    return (
        <div className={styles.mainDiv}>
            <div>
                <p>New allowed group:</p>
                <input
                    className={styles.textInput}
                    type="text"
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value.toUpperCase())}
                />
                <button onClick={onAddGroup}>Add</button>
            </div>
            <ul className={styles.list}>
                {allowedGroups.map((value, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onDeleteGroup(index)}
                            className={styles.delButton}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>{' '}
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllowedGroupsEditor;
