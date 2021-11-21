import React from 'react';
import styles from './Tab.module.css';
import { toClassNames } from '../../../../util/toClassNames';

export interface Props {
    tabName: string;
    selected: boolean;

    onSelect: () => void,
    onClose: () => void,
}

const Tab: React.FC<Props> = ({ tabName, selected, onSelect, onClose }) => {

    return <div
        className={toClassNames({
            [styles.tab]: true,
            [styles.selected]: selected,
        })}
        onClick={() => !selected && onSelect()}
    >
        <p>{tabName}</p>
        <button
            className={styles.closeButton}
            onClick={e => { e.stopPropagation(); onClose(); }}
        >X</button>
    </div>;
};

export default Tab;