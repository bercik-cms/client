import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './Spinner.module.css';

const Spinner: React.FC<{}> = ({}) => {
    return (
        <div className={styles.spinnerHolder}>
            <FontAwesomeIcon className={styles.spinner} icon={faSpinner} />
        </div>
    );
};

export default Spinner;
