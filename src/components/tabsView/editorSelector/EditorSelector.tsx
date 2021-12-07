import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
    function onGoBack() {
        onChangeTabSubtitle("");
        onNavigate(tabName.slice(0, tabName.length - 1));
    }

    function onEditorClick(nameClicked: string) {
        onNavigate([...tabName, nameClicked]);
    }

    if (tabName.length === 2) {
        let EditorComponent = editors[tabName[0]].editors[tabName[1]].component;
        return <div className={styles.editorHolder}>
            <button className={styles.goBackButton} onClick={onGoBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className={styles.editorHolderInner}>
                <EditorComponent
                    onChangeTabSubtitle={onChangeTabSubtitle}
                />
            </div>
        </div>;
    }

    let folderElements = getFolderElements(tabName);

    return <div className={styles.gridButtonContainer}>
        {tabName.length !== 0 &&
            <button className={styles.goBackButton} onClick={onGoBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        }
        <div className={styles.elementGrid}>
            {folderElements.map((element, index) => (
                <div
                    key={index}
                    className={styles.gridItem}
                    onClick={() => onEditorClick(element.name)}
                >
                    <FontAwesomeIcon className={styles.itemIcon} icon={element.icon} />
                    <p className={styles.itemTitle}>{element.name}</p>
                </div>
            ))}
        </div>
    </div>;
};

export default EditorSelector;
