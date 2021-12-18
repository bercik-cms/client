import React from 'react';
import {
    CreateEndpointRequest,
    EndpointInfoCreateRequest,
} from '../../../../../../api/endpoints/endpointTypes';
import BercikSelect from '../../../../../selectComponent/BercikSelect';
import AllowedGroupsEditor from './allowedGroupsEditor/AllowedGroupsEditor';
import styles from './EndpointEditor.module.css';
import QueryEditorList from './queryEditorList/QueryEditorList';

interface Props {
    title: string;
    data: CreateEndpointRequest;
    onChange: (newData: CreateEndpointRequest) => void;
}

const EndpointEditor: React.FC<Props> = ({ title, data, onChange }) => {
    function onQueriesChange(newQueries: Array<EndpointInfoCreateRequest>) {
        if (newQueries.length === 0)
            newQueries = [{ name: 'name', sql: '', children: [] }];
        onChange({ ...data, endpoints_info: newQueries });
    }

    return (
        <div className={styles.mainDiv}>
            <h3>
                {title !== ''
                    ? `Editing endpoint with id ${title}`
                    : 'Creating new endpoint'}
            </h3>

            <div className={styles.labelWithInput}>
                <p>Path</p>
                <input
                    type="text"
                    value={data.path}
                    onChange={(e) => {
                        onChange({ ...data, path: e.target.value });
                    }}
                />
            </div>

            <div className={styles.labelWithInput}>
                <p>Method</p>
                <BercikSelect
                    options={[
                        { value: 'GET', label: 'GET' },
                        { value: 'POST', label: 'POST' },
                        { value: 'ANY', label: 'ANY' },
                    ]}
                    selected={{ value: data.method, label: data.method }}
                    onSelect={(newVal) =>
                        onChange({ ...data, method: newVal.value })
                    }
                />
            </div>

            <div className={styles.labelWithInput}>
                <p>Allowed groups:</p>
                <AllowedGroupsEditor
                    allowedGroups={data.allowed_groups}
                    onChange={(newGroups) =>
                        onChange({ ...data, allowed_groups: newGroups })
                    }
                />
            </div>

            <QueryEditorList
                topLevel
                queries={data.endpoints_info}
                onChange={onQueriesChange}
            />
        </div>
    );
};

export default EndpointEditor;
