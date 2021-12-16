import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

interface Props {
    testSql: string;
    onChangeTestSql: (newTestSql: string) => void;
    diffQuery: boolean;
    onToggleDiffQuery: () => void;
    diffMermaid: boolean;
    onToggleDiffMermaid: () => void;
}

const QueryTesting: React.FC<Props> = ({
    testSql,
    onChangeTestSql,
    diffQuery,
    onToggleDiffQuery,
    diffMermaid,
    onToggleDiffMermaid,
}) => {
    return (
        <div>
            <h2 style={{ marginBottom: '.5rem' }}>Query testing</h2>
            <CodeEditor
                language="sql"
                placeholder="Enter a query to diff before and after execution"
                value={testSql}
                onChange={(e) => onChangeTestSql(e.target.value)}
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
                }}
            />
            <button
                style={{
                    padding: '.5rem',
                    marginTop: '.5rem',
                    backgroundColor: diffQuery ? 'var(--bg2)' : 'var(--bg0)',
                }}
                onClick={() => onToggleDiffQuery()}
            >
                Diff test query
            </button>

            <button
                style={{
                    padding: '.5rem',
                    marginTop: '.5rem',
                    marginLeft: '.5rem',
                    backgroundColor: diffMermaid ? 'var(--bg2)' : 'var(--bg0)',
                }}
                onClick={() => onToggleDiffMermaid()}
            >
                Diff mermaid.js ER diagram
            </button>
        </div>
    );
};

export default QueryTesting;
