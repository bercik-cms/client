import { GetEndpointInfo } from './endpointTypes';
import axios from 'axios';

export function getEndpointInfo(): Promise<Array<GetEndpointInfo>> {
    return new Promise((resolve, reject) => {
        axios
            .get('/api/get-endpoints', {})
            .then((data) => resolve(data.data))
            .catch((err) => reject(err.response.data));
    });
}
