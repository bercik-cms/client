import React from 'react';
import styles from './EditorBlock.module.css';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { toClassNames } from '../../../../../../../util/toClassNames';

interface Props {
    onChange: (newStr: string) => void;
    value: string;
    enabled: boolean;

    onMoveUp: () => void;
    onDelete: () => void;
    onToggleEnabled: () => void;
    onMoveDown: () => void;
}

const EditorBlock: React.FC<Props> = ({
    onChange,
    value,
    enabled,
    onDelete,
    onToggleEnabled,
    onMoveUp,
    onMoveDown,
}) => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.buttonHolder}>
                <button onClick={() => onMoveUp()}>Move up</button>
                <button onClick={() => onDelete()}>Delete</button>
                <button onClick={() => onToggleEnabled()}>
                    {enabled ? 'Disable' : 'Enable'}
                </button>
                <button onClick={() => onMoveDown()}>Move down</button>
            </div>

            <CodeEditor
                disabled={!enabled}
                value={value}
                language="sql"
                placeholder="Enter a single SQL expression."
                onChange={(e) => onChange(e.target.value)}
                padding={15}
                style={{
                    flexGrow: 1,
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: 'var(--fg0)',
                    border: '1px solid var(--fg0)',
                    borderRadius: '5px',

                    background: enabled ? 'var(--bg0)' : 'var(--bg2)',
                    opacity: enabled ? '100%' : '50%',
                }}
            />
        </div>
    );
};

export default EditorBlock;
