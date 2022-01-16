import axios from 'axios';

export interface CreateUsersRequest {
    username: string;
    user_group: string;
    amount: number;
}

export interface UsernamePass {
    username: string;
    password: string;
}

export interface CreateUsersResponse {
    new_users: Array<UsernamePass>;
}

export function apiCreateUsers(
    req: CreateUsersRequest
): Promise<CreateUsersResponse> {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/create-users', req)
            .then((data) => resolve(data.data))
            .catch((err) => reject(err.response.data));
    });
}
