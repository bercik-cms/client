import axios from 'axios';
import { EndpointTestRequest, EndpointTestResult } from './endpointTypes';

export function apiTestEndpoint(
    req: EndpointTestRequest
): Promise<EndpointTestResult> {
    console.log(JSON.stringify(req));
    return new Promise((resolve, reject) => {
        axios
            .post('/api/test-endpoint', req)
            .then((resp) => resolve(resp.data))
            .catch((err) => reject(err.response.data));
    });
}
