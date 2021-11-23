import { faMoon, faPlus, faSun } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Tab from './tab/Tab';
import styles from './TabBar.module.css';
import { isThemeDark, setTheme, toggleTheme } from '../../../util/colorSchemes';

export interface Props {
    tabNames: Array<Array<string>>;
    selectedTab: number;

    onSelect: (index: number) => void,
    onClose: (index: number) => void,
    onNewTab: () => void,
}

const TabBar: React.FC<Props> = ({ tabNames, selectedTab, onSelect, onClose, onNewTab }) => {
    let [themeIcon, setThemeIcon] = useState<IconDefinition>(isThemeDark() ? faSun : faMoon);

    function onThemeButtonClick() {
        let wasDark = isThemeDark();
        toggleTheme();
        setThemeIcon(wasDark ? faMoon : faSun);
    }

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
        <button onClick={onThemeButtonClick} className={styles.newTabButton}>
            <FontAwesomeIcon icon={themeIcon} />
        </button>
    </div>;
};

export default TabBar;