import React from 'react';
import styles from './Tab.module.css';
import { toClassNames } from '../../../../util/toClassNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faTimes, faTimesCircle, faXRay } from '@fortawesome/free-solid-svg-icons';

export interface Props {
    tabName: string;
    selected: boolean;

    onSelect: () => void,
    onClose: () => void,
}

const Tab: React.FC<Props> = ({ tabName, selected, onSelect, onClose }) => {

    function onTabClick(e: React.MouseEvent) {
        // Close tab on middle click
        if (e.button === 1) {
            e.stopPropagation();
            onClose();
        }
        if (!selected && e.button === 0) onSelect();
    }

    return <div
        className={toClassNames({
            [styles.tab]: true,
            [styles.selected]: selected,
        })}
        onClick={onTabClick}
        onAuxClick={onTabClick}
    >
        <p>{tabName}</p>
        <button
            className={styles.closeButton}
            onClick={e => { e.stopPropagation(); onClose(); }}
        >
            <FontAwesomeIcon icon={faTimes} />
        </button>
    </div>;
};

export default Tab;