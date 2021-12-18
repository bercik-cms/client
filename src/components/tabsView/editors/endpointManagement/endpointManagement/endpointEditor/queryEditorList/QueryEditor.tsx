import React from 'react';
import { EndpointInfoCreateRequest } from '../../../../../../../api/endpoints/endpointTypes';
import styles from './QueryEditor.module.css';
import CodeEditor from '@uiw/react-textarea-code-editor';
import QueryEditorList from './QueryEditorList';

interface Props {
    query: EndpointInfoCreateRequest;
    onChange: (newQuery: EndpointInfoCreateRequest) => void;
    onDelete: () => void;
}

const QueryEditor: React.FC<Props> = ({ query, onChange, onDelete }) => {
    function onChangeSql(newSql: string) {
        onChange({ ...query, sql: newSql });
    }

    function onChangeName(newName: string) {
        onChange({ ...query, name: newName });
    }

    function onChildrenChange(newChildren: Array<EndpointInfoCreateRequest>) {
        onChange({ ...query, children: newChildren });
    }

    function onNewChild() {
        onChange({
            ...query,
            children: [
                ...query.children,
                { name: 'name', sql: '', children: [] },
            ],
        });
    }

    return (
        <div className={styles.mainDiv}>
            <div className={styles.nameDiv}>
                <p>Name</p>
                <input
                    type="text"
                    value={query.name}
                    onChange={(e) => onChangeName(e.target.value)}
                />
            </div>

            <CodeEditor
                value={query.sql}
                language="sql"
                placeholder="Enter a single SQL expression."
                onChange={(e) => onChangeSql(e.target.value)}
                padding={15}
                style={{
                    flexGrow: 1,
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: 'var(--fg0)',
                    border: '1px solid var(--fg0)',
                    borderRadius: '5px',
                    background: 'var(--bg0)',
                    borderBottomLeftRadius:
                        query.children.length === 0 ? '5px' : '0',
                    borderBottomRightRadius: '0',
                }}
            />

            <div className={styles.buttonsHolder}>
                <button
                    className={styles.newChildButton}
                    onClick={() => onNewChild()}
                >
                    New child
                </button>

                {query.children.length === 0 && (
                    <button
                        className={styles.deleteButton}
                        onClick={() => onDelete()}
                    >
                        Delete
                    </button>
                )}
            </div>

            {query.children.length !== 0 && (
                <div className={styles.childrenDiv}>
                    <QueryEditorList
                        queries={query.children}
                        onChange={onChildrenChange}
                    />
                </div>
            )}
        </div>
    );
};

export default QueryEditor;
