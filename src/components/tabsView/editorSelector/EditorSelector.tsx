import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import editors, { getFolderElements } from '../editors/editors';
import styles from './EditorSelector.module.css';

interface Props {
    tabName: Array<string>,
    onChangeTabSubtitle: (subtitle: string) => void,
    onNavigate: (newPath: Array<string>) => void,
}

const EditorSelector: React.FC<Props> = ({ tabName, onChangeTabSubtitle, onNavigate }) => {
    function onExitEditor() {
        onNavigate([tabName[0]]);
    }

    if (tabName.length === 2) {
        let EditorComponent = editors[tabName[0]].editors[tabName[1]].component;
        return <EditorComponent
            onChangeTabSubtitle={onChangeTabSubtitle}
            onExitEditor={onExitEditor}
        />;
    }

    let folderElements = getFolderElements(tabName);

    return <div className={styles.elementGrid}>
        {folderElements.map((element, index) => (
            <div key={index} className={styles.gridItem}>
                <FontAwesomeIcon className={styles.itemIcon} icon={element.icon} />
                <p className={styles.itemTitle}>{element.name}</p>
            </div>
        ))}
    </div>;
};

export default EditorSelector;