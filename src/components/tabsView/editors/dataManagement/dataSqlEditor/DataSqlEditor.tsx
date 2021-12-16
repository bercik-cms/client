import React, { useState } from 'react';
import { TableData } from '../../../../../api/dataManagement/table_data';
import { apiSqlEditor } from '../../../../../api/sql/sqlEditor';
import MessageComponent from '../../../../messageComponent/MessageComponent';
import { EditorComponentProps } from '../../editors';
import styles from './DataSqlEditor.module.css';
import EditorBlockList, { Block } from './editorBlockList/EditorBlockList';
import QueryTesting from './queryTesting/QueryTesting';
import TableDiff from './diffs/TableDiff';
import MermaidDiff from './diffs/MermaidDiff';

interface Props extends EditorComponentProps {}

const DataSqlEditor: React.FC<Props> = ({}) => {
    let [sqlBlocks, setSqlBlocks] = useState<Array<Block>>([
        { value: '', enabled: true },
    ]);
    let [sqlResults, setSqlResults] = useState<{ [index: number]: TableData }>(
        {}
    );
    let [testSql, setTestSql] = useState<string>('');
    let [disableUpdate, setDisableUpdate] = useState(false);

    let [diffQuery, setDiffQuery] = useState<boolean>(false);
    let [diffMermaid, setDiffMermaid] = useState<boolean>(false);

    let [message, setMessage] = useState('');

    let [queryDiffResult, setQueryDiffResult] =
        useState<Array<TableData> | null>(null);
    let [mermaidDiffResult, setMermaidDiffResult] =
        useState<Array<string> | null>(null);

    function onBlocksUpdate(newBlocks: Array<Block>) {
        if (!disableUpdate) {
            setSqlBlocks(newBlocks);

            // Remove tables when user starts editing
            if (Object.keys(sqlResults).length !== 0) {
                setSqlResults({});
            }
        }
    }

    function onToggleDiffQuery() {
        setDiffQuery(!diffQuery);
    }

    function onToggleDiffMermaid() {
        setDiffMermaid(!diffMermaid);
    }

    function onTest() {
        sendToApi(false);
    }

    function onCommit() {
        sendToApi(true);
    }

    function sendToApi(commit: boolean) {
        setDisableUpdate(true);

        let queries = sqlBlocks
            .filter((it) => it.enabled)
            .map((it) => it.value);

        apiSqlEditor({
            queries,
            diff_query: testSql,
            should_diff_query: diffQuery,
            should_diff_mermaid: diffMermaid,
            execute: commit,
        })
            .then((response) => {
                console.log(response.mermaid_diff);
                if (message !== '') setMessage('');
                setDisableUpdate(false);
                let results: { [index: number]: TableData } = {};
                let respIndex = 0;
                sqlBlocks.forEach((value, index) => {
                    if (value.enabled) {
                        results[index] = response.query_results[respIndex++];
                    }
                });
                setSqlResults(results);

                if (commit === false) {
                    setMermaidDiffResult(response.mermaid_diff);
                    setQueryDiffResult(response.query_diff);
                } else {
                    setMermaidDiffResult(null);
                    setQueryDiffResult(null);
                }
            })
            .catch((err) => {
                setDisableUpdate(false);
                setMessage(err);
            });
    }

    return (
        <div>
            <EditorBlockList
                blocks={sqlBlocks}
                onChange={onBlocksUpdate}
                resultMap={sqlResults}
            />

            <QueryTesting
                testSql={testSql}
                onChangeTestSql={(newTestSql) => setTestSql(newTestSql)}
                diffQuery={diffQuery}
                onToggleDiffQuery={() => onToggleDiffQuery()}
                diffMermaid={diffMermaid}
                onToggleDiffMermaid={() => onToggleDiffMermaid()}
            />

            {queryDiffResult !== null && (
                <TableDiff
                    before={queryDiffResult[0]}
                    after={queryDiffResult[1]}
                />
            )}

            {mermaidDiffResult !== null && (
                <MermaidDiff
                    before={mermaidDiffResult[0]}
                    after={mermaidDiffResult[1]}
                />
            )}

            <div className={styles.commitButtonsHolder}>
                <button onClick={() => onTest()} className={styles.testButton}>
                    Test
                </button>
                <button
                    onClick={() => onCommit()}
                    className={styles.commitButton}
                >
                    Commit
                </button>
            </div>

            {message !== '' && (
                <MessageComponent success={false} message={message} />
            )}
        </div>
    );
};

export default DataSqlEditor;
