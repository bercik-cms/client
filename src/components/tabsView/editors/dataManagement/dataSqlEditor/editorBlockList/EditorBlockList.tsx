import React from 'react';
import { TableData } from '../../../../../../api/dataManagement/table_data';
import SimpleTable from '../../../../../simpleTable/SimpleTable';
import EditorBlock from './editorBlock/EditorBlock';
import styles from './EditorBlockList.module.css';

export interface Block {
    value: string;
    enabled: boolean;
}

interface Props {
    blocks: Array<Block>;
    onChange: (newBlocks: Array<Block>) => void;
    resultMap: { [index: number]: TableData };
}

const EditorBlockList: React.FC<Props> = ({ blocks, onChange, resultMap }) => {
    function onBlockChange(newVal: string, index: number) {
        onChange([
            ...blocks.slice(0, index),
            { value: newVal, enabled: blocks[index].enabled },
            ...blocks.slice(index + 1, blocks.length),
        ]);
    }

    function onBlockMoveUp(index: number) {
        if (index === 0) return;
        onChange([
            ...blocks.slice(0, index - 1),
            blocks[index],
            blocks[index - 1],
            ...blocks.slice(index + 1, blocks.length),
        ]);
    }

    function onBlockMoveDown(index: number) {
        if (index === blocks.length - 1) return;
        onChange([
            ...blocks.slice(0, index),
            blocks[index + 1],
            blocks[index],
            ...blocks.slice(index + 2, blocks.length),
        ]);
    }

    function onBlockDelete(index: number) {
        if (blocks.length === 1) onChange([{ value: '', enabled: true }]);
        else
            onChange([
                ...blocks.slice(0, index),
                ...blocks.slice(index + 1, blocks.length),
            ]);
    }

    function onBlockToggleEnabled(index: number) {
        onChange([
            ...blocks.slice(0, index),
            { value: blocks[index].value, enabled: !blocks[index].enabled },
            ...blocks.slice(index + 1, blocks.length),
        ]);
    }

    function onNewBlock() {
        onChange([...blocks, { value: '', enabled: true }]);
    }

    return (
        <div>
            <h2>SQL statements</h2> <br />
            {blocks.map((block, index) => (
                <React.Fragment key={index}>
                    <EditorBlock
                        onChange={(val) => onBlockChange(val, index)}
                        onMoveUp={() => onBlockMoveUp(index)}
                        onMoveDown={() => onBlockMoveDown(index)}
                        value={block.value}
                        enabled={block.enabled}
                        onDelete={() => onBlockDelete(index)}
                        onToggleEnabled={() => onBlockToggleEnabled(index)}
                    />

                    {resultMap[index] !== undefined &&
                        resultMap[index].names.length !== 0 && (
                            <div className={styles.tableHolder}>
                                <h4>Query result: </h4>
                                <SimpleTable data={resultMap[index]} />
                            </div>
                        )}
                </React.Fragment>
            ))}
            <button
                style={{ display: 'block', margin: 'auto', padding: '.5rem' }}
                onClick={onNewBlock}
            >
                New block
            </button>
        </div>
    );
};

export default EditorBlockList;
