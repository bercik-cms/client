import React, { useState } from 'react';
import { TableData } from '../../../../../../api/dataManagement/table_data';
import SimpleTable from '../../../../../simpleTable/SimpleTable';

interface Props {
    before: TableData;
    after: TableData;
}

const TableDiff: React.FC<Props> = ({ before, after }) => {
    let [showsBefore, setShowsBefore] = useState(false);

    return (
        <div
            style={{
                padding: '.5rem',
                border: '1px solid var(--fg0)',
                margin: '1rem 0',
                overflow: 'auto',
                maxHeight: '500px',
            }}
        >
            <button
                style={{
                    backgroundColor: showsBefore ? 'var(--bg2)' : 'var(--bg0)',
                }}
                onClick={() => setShowsBefore(true)}
            >
                Before
            </button>
            <button
                style={{
                    backgroundColor: !showsBefore ? 'var(--bg2)' : 'var(--bg0)',
                }}
                onClick={() => setShowsBefore(false)}
            >
                After
            </button>

            <SimpleTable data={showsBefore ? before : after} />
        </div>
    );
};

export default TableDiff;
