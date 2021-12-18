import React, { useEffect, useMemo, useState } from 'react';
import { getEndpointInfo } from '../../../../../api/endpoints/endpointInfo';
import {
    apiCreateEndpoint,
    apiDeleteEndpoint,
    apiUpdateEndpoint,
} from '../../../../../api/endpoints/endpointModify';
import { apiTestEndpoint } from '../../../../../api/endpoints/endpointTest';
import {
    CreateEndpointRequest,
    GetEndpointInfo,
} from '../../../../../api/endpoints/endpointTypes';
import MessageComponent from '../../../../messageComponent/MessageComponent';
import BercikSelect, {
    SelectOptionInterface,
} from '../../../../selectComponent/BercikSelect';
import Spinner from '../../../../spinner/Spinner';
import { EditorComponentProps } from '../../editors';
import EndpointEditor from './endpointEditor/EndpointEditor';
import TestingDataEditor from './endpointEditor/testingDataEditor/TestingDataEditor';
import styles from './EndpointManagement.module.css';

const emptyEndpoint: CreateEndpointRequest = {
    path: '/',
    method: 'ANY',
    allowed_groups: ['PUBLIC'],
    endpoints_info: [{ name: 'name', sql: '', children: [] }],
};

interface Props extends EditorComponentProps {}

const EndpointManagement: React.FC<Props> = ({}) => {
    let [loading, setLoading] = useState(true);
    let [message, setMessage] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    let [endpointInfo, setEndpoinInfo] = useState<Array<GetEndpointInfo>>([]);

    useEffect(() => {
        loadEndpoints();
    }, []);

    function loadEndpoints() {
        getEndpointInfo()
            .then((data) => {
                setEndpoinInfo(data);
                setLoading(false);
            })
            .catch((err) => setMessage({ success: false, message: err }));
    }

    let endpointSelectValues: Array<SelectOptionInterface> = useMemo(() => {
        return [
            { value: '-1', label: 'Create new' },
            ...endpointInfo.map((value, index) => ({
                value: `${index}`,
                label: `(${value.id}) (${value.method}) ${value.path}`,
            })),
        ];
    }, [endpointInfo]);

    let [editingEndpoint, setEditingEndpoint] = useState(-1);

    let [editingData, setEditingData] = useState<CreateEndpointRequest>({
        ...emptyEndpoint,
    });

    useEffect(() => {
        if (editingEndpoint === -1) setEditingData({ ...emptyEndpoint });
        else setEditingData({ ...endpointInfo[editingEndpoint] });
    }, [editingEndpoint]);

    let [testingData, setTestingData] = useState<{ [key: string]: string }>({});

    let [testingResult, setTestingResult] = useState('');

    function onTestEndpoint() {
        let create_req = { ...editingData };

        if ((create_req as any)['id']) delete (create_req as any)['id'];

        apiTestEndpoint({
            create_req,
            req_variables: testingData,
        })
            .then((resp) => {
                setMessage({
                    success: resp.ok,
                    message: resp.ok ? 'Ok' : resp.msg,
                });
                if (resp.ok) setTestingResult(resp.msg);
            })
            .catch((err) => setMessage({ success: false, message: err }));
    }

    function onSaveEndpoint() {
        if (editingEndpoint === -1) {
            apiCreateEndpoint(editingData)
                .then(() => {
                    setMessage({
                        success: true,
                        message: 'Saved successfully',
                    });
                    loadEndpoints();
                })
                .catch((e) => setMessage({ success: false, message: e }));
        } else {
            let id = endpointInfo[editingEndpoint].id;
            apiUpdateEndpoint({ ...editingData, id })
                .then(() => {
                    setMessage({
                        success: true,
                        message: 'Saved successfully',
                    });
                    loadEndpoints();
                })
                .catch((e) => setMessage({ success: false, message: e }));
        }
    }

    function onDeleteEndpoint() {
        if (editingEndpoint === -1) return;

        let id = endpointInfo[editingEndpoint].id;
        apiDeleteEndpoint({ id })
            .then(() =>
                setMessage({
                    success: true,
                    message: `Deleted endpoint with id ${id}`,
                })
            )
            .catch((err) => setMessage({ success: false, message: err }));

        setEditingEndpoint(-1);
        loadEndpoints();
    }

    if (loading) return <Spinner />;
    return (
        <div>
            <h3 style={{ marginBottom: '1rem' }}>
                Select endpoint to modify or "Create new" to create new.
            </h3>
            <BercikSelect
                options={endpointSelectValues}
                selected={endpointSelectValues[editingEndpoint + 1]}
                onSelect={(sel) => setEditingEndpoint(+sel.value)}
            />

            <EndpointEditor
                title={
                    editingEndpoint === -1
                        ? ''
                        : endpointInfo[editingEndpoint].id.toString()
                }
                data={editingData}
                onChange={(newData) => setEditingData(newData)}
            />

            <TestingDataEditor
                dataMap={testingData}
                onChange={(newMap) => setTestingData(newMap)}
            />

            <button className={styles.confirmButton} onClick={onTestEndpoint}>
                Test endpoint with data
            </button>
            <button className={styles.confirmButton} onClick={onSaveEndpoint}>
                Save endpoint
            </button>
            <button className={styles.confirmButton} onClick={onDeleteEndpoint}>
                Delete endpoint
            </button>

            {message !== null && <MessageComponent {...message} />}

            {testingResult !== '' && (
                <div>
                    <h3>Testing result:</h3> <br />
                    <pre>
                        <code>{testingResult}</code>
                    </pre>
                </div>
            )}
        </div>
    );
};

export default EndpointManagement;
