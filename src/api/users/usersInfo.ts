import axios from 'axios';

export interface UserInfo {
    username: string;
    user_group: string;
}

export function apiUsersInfo(): Promise<Array<UserInfo>> {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/users-info')
            .then((data) => resolve(data.data))
            .catch((err) => reject(err.response.data));
    });
}
