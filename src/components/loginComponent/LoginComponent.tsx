import React, { useState } from 'react';
import { apiLogin } from '../../api/login/login';
import MessageComponent from '../messageComponent/MessageComponent';
import styles from './LoginComponent.module.css';

interface Props {
    onSetToken: (tok: string) => void;
}

const LoginComponent: React.FC<Props> = ({ onSetToken }) => {
    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');

    let [message, setMessage] = useState('');

    function onClickLogin() {
        apiLogin({ username: login, password })
            .then((resp) => {
                if (resp.claims.user_group !== 'ADMIN') {
                    setMessage(
                        'This account does not have permission to use the admin panel'
                    );
                    return;
                }
                onSetToken(resp.token);
            })
            .catch((err) => setMessage(err));
    }

    return (
        <div className={styles.mainDiv}>
            <h2>Please log in</h2>

            <label htmlFor="LoginLabel">Login</label>
            <input
                id="LoginLabel"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <label htmlFor="PasswordLabel">Password</label>
            <input
                id="PasswordLabel"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={() => onClickLogin()}>Login</button>

            {message !== '' && (
                <MessageComponent success={false} message={message} />
            )}
        </div>
    );
};

export default LoginComponent;
