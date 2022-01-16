import axios from 'axios';

export interface UserInfo {
    username: string;
    user_group: string;
}

export interface DeleteUserRequest {
    username: string;
}

export function apiDeleteUser(req: DeleteUserRequest): Promise<void> {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/delete-user', req)
            .then(() => resolve())
            .catch((err) => reject(err.response.data));
    });
}
