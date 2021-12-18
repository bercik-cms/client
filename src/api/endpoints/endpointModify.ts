import {
    CreateEndpointRequest,
    UpdateEndpointRequest,
    DeleteEndpointRequest,
} from './endpointTypes';

import axios from 'axios';

export function apiCreateEndpoint(req: CreateEndpointRequest): Promise<void> {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/create-endpoint', req)
            .then((_resp) => resolve())
            .catch((err) => reject(err.response.data));
    });
}

export function apiUpdateEndpoint(req: UpdateEndpointRequest): Promise<void> {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/update-endpoint', req)
            .then((_resp) => resolve())
            .catch((err) => reject(err.response.data));
    });
}

export function apiDeleteEndpoint(req: DeleteEndpointRequest): Promise<void> {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/delete-endpoint', req)
            .then((_resp) => resolve())
            .catch((err) => reject(err.response.data));
    });
}
