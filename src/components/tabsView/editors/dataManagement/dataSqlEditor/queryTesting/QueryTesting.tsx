import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

interface Props {
    testSql: string;
    onChangeTestSql: (newTestSql: string) => void;
    onTest: () => void;
    onTestDiagram: () => void;
}

const QueryTesting: React.FC<Props> = ({
    testSql,
    onChangeTestSql,
    onTest,
    onTestDiagram,
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
                style={{ padding: '.5rem', marginTop: '.5rem' }}
                onClick={() => onTest()}
            >
                Diff test query
            </button>

            <button
                style={{
                    padding: '.5rem',
                    marginTop: '.5rem',
                    marginLeft: '.5rem',
                }}
                onClick={() => onTestDiagram()}
            >
                Diff mermaid.js ER diagram
            </button>
        </div>
    );
};

export default QueryTesting;
