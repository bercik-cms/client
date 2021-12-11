import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './ColumnAction.module.css';

interface Props {
    onAscending: () => void;
    onDescending: () => void;
}

const ColumnAction: React.FC<Props> = ({ onAscending, onDescending }) => {
    return (
        <div className={styles.div}>
            <button className={styles.button} onClick={() => onDescending()}>
                <FontAwesomeIcon icon={faArrowDown} />
            </button>

            <button className={styles.button} onClick={() => onAscending()}>
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </div>
    );
};

export default ColumnAction;
