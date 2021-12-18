import React from 'react';
import { EndpointInfoCreateRequest } from '../../../../../../../api/endpoints/endpointTypes';
import QueryEditor from './QueryEditor';
import styles from './QueryEditorList.module.css';

interface Props {
    queries: Array<EndpointInfoCreateRequest>;
    onChange: (newQueries: Array<EndpointInfoCreateRequest>) => void;
    topLevel?: boolean | undefined;
}

const QueryEditorList: React.FC<Props> = ({ queries, onChange, topLevel }) => {
    function onQueryChange(index: number, newQuery: EndpointInfoCreateRequest) {
        onChange([
            ...queries.slice(0, index),
            newQuery,
            ...queries.slice(index + 1, queries.length),
        ]);
    }

    function onQueryDelete(index: number) {
        onChange([
            ...queries.slice(0, index),
            ...queries.slice(index + 1, queries.length),
        ]);
    }

    return (
        <div className={styles.mainDiv}>
            {queries.map((value, index) => (
                <React.Fragment key={index}>
                    <QueryEditor
                        query={value}
                        onChange={(n) => onQueryChange(index, n)}
                        onDelete={() => onQueryDelete(index)}
                    />
                    {topLevel === true && <br style={{ height: '2rem' }} />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default QueryEditorList;
