import React, { useState } from 'react';
import { EditorComponentProps } from '../../editors';
import styles from './DataSqlEditor.module.css';
import EditorBlockList, { Block } from './editorBlockList/EditorBlockList';
import QueryTesting from './queryTesting/QueryTesting';

interface Props extends EditorComponentProps {}

const DataSqlEditor: React.FC<Props> = ({}) => {
    let [sqlBlocks, setSqlBlocks] = useState<Array<Block>>([
        { value: '', enabled: true },
    ]);
    let [testSql, setTestSql] = useState<string>('');

    function onBlocksUpdate(newBlocks: Array<Block>) {
        console.log(newBlocks);
        setSqlBlocks(newBlocks);
    }

    function onQueryTest() {}

    function onDiagramTest() {}

    return (
        <div>
            <EditorBlockList blocks={sqlBlocks} onChange={onBlocksUpdate} />
            <QueryTesting
                testSql={testSql}
                onChangeTestSql={(newTestSql) => setTestSql(newTestSql)}
                onTest={() => onQueryTest()}
                onTestDiagram={() => onDiagramTest()}
            />
        </div>
    );
};

export default DataSqlEditor;

