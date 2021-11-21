import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Tab from './tab/Tab';
import styles from './TabBar.module.css';

export interface Props {
    tabNames: Array<Array<string>>;
    selectedTab: number;

    onSelect: (index: number) => void,
    onClose: (index: number) => void,
    onNewTab: () => void,
}

const TabBar: React.FC<Props> = ({ tabNames, selectedTab, onSelect, onClose, onNewTab }) => {
    return <div className={styles.tabBar}>
        <button onClick={onNewTab} className={styles.newTabButton}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
        {tabNames.map((name, index) => (
            <Tab
                key={index}
                tabName={(name.length !== 0) ? name[name.length - 1] : "Selecting editor"}
                selected={index === selectedTab}
                onSelect={() => onSelect(index)}
                onClose={() => onClose(index)}
            />
        ))}
    </div>;
};

export default TabBar;