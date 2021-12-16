import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styles from './MermaidComponent.module.css';
import mermaid from 'mermaid';
import { toClassNames } from '../../util/toClassNames';

interface Props {
    diagramStr: string;
    _key: string;
}

mermaid.initialize({
    startOnLoad: false,
    theme: 'forest',
});

const MermaidComponent: React.FC<Props> = ({ diagramStr, _key }) => {
    let [fullscreen, setFullscreen] = useState(false);
    let id = `mermaid-${_key}`;
    let ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current !== null) {
            mermaid.render(id, diagramStr, (result) => {
                ref.current!.innerHTML = result;
            });
        }
    }, [diagramStr]);

    return (
        <div className={toClassNames({ [styles.fsContainer]: fullscreen })}>
            <div className={styles.container}>
                <button
                    className={styles.fsButton}
                    onClick={() => setFullscreen(!fullscreen)}
                >
                    <FontAwesomeIcon
                        icon={fullscreen ? faCompress : faExpand}
                    />
                </button>

                <div key="faux" id={id} />
                <div key="preview" ref={ref} />
            </div>
        </div>
    );
};

export default MermaidComponent;
