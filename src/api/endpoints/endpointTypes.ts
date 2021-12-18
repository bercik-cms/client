export interface EndpointInfoCreateRequest {
    name: string;
    sql: string;
    children: Array<EndpointInfoCreateRequest>;
}

export interface CreateEndpointRequest {
    path: string;
    method: string;
    endpoints_info: Array<EndpointInfoCreateRequest>;
    allowed_groups: Array<string>;
}

export interface UpdateEndpointRequest {
    id: number;
    path: string;
    method: string;
    endpoints_info: Array<EndpointInfoCreateRequest>;
    allowed_groups: Array<string>;
}

export interface DeleteEndpointRequest {
    id: number;
}

export interface GetEndpointInfo {
    id: number;
    path: string;
    method: string;
    endpoints_info: Array<EndpointInfoCreateRequest>;
    allowed_groups: Array<string>;
}

export interface EndpointTestRequest {
    create_req: CreateEndpointRequest;
    req_variables: { [key: string]: string };
}

export interface EndpointTestResult {
    ok: boolean;
    msg: string;
}
