import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './RowAction.module.css';

interface Props {
    onEdit: () => void;
    onDelete: () => void;
}

const RowAction: React.FC<Props> = ({ onEdit, onDelete }) => {
    return (
        <div className={styles.div}>
            <button onClick={onDelete} className={styles.buttonDelete}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <button onClick={onEdit} className={styles.buttonEdit}>
                <FontAwesomeIcon icon={faPen} />
            </button>
        </div>
    );
};

export default RowAction;
