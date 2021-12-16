import React, { useState } from 'react';
import MermaidComponent from '../../../../../mermaidComponent/MermaidComponent';

interface Props {
    before: string;
    after: string;
}

const MermaidDiff: React.FC<Props> = ({ before, after }) => {
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

            <MermaidComponent
                diagramStr={showsBefore ? before : after}
                _key="diff1239"
            />
        </div>
    );
};

export default MermaidDiff;
