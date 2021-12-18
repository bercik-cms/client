import axios from 'axios';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface Claims {
    username: string;
    user_group: string;
    exp: number;
}

export interface LoginResponse {
    token: string;
    claims: Claims;
}

export function apiLogin(req: LoginRequest): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/login', req)
            .then((resp) => resolve(resp.data))
            .catch((err) => reject(err.response.data));
    });
}
