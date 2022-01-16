import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { apiDeleteUser } from '../../../../../api/users/deleteUser';
import { apiUsersInfo, UserInfo } from '../../../../../api/users/usersInfo';
import MessageComponent from '../../../../messageComponent/MessageComponent';
import Spinner from '../../../../spinner/Spinner';
import { EditorComponentProps } from '../../editors';
import styles from './UserManagement.module.css';

interface Props extends EditorComponentProps {}

const UserManagement: React.FC<Props> = ({}) => {
    let [usersInfo, setUsersInfo] = useState<Array<UserInfo>>([]);
    let [loading, setLoading] = useState(true);
    let [message, setMessage] = useState('');

    function loadUserInfo() {
        apiUsersInfo()
            .then((users) => {
                setUsersInfo(users);
                setLoading(false);
            })
            .catch((message) => setMessage(message));
    }

    useEffect(loadUserInfo, []);

    function onUserDelete(username: string) {
        apiDeleteUser({ username })
            .then(() => loadUserInfo())
            .catch((message) => setMessage(message));
    }

    if (loading) return <Spinner />;

    return (
        <div>
            <h3>Users</h3>

            <br />

            <table className={styles.usersTable}>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>user group</th>
                        <th>delete user</th>
                    </tr>
                </thead>

                <tbody>
                    {usersInfo.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.user_group}</td>
                            <td>
                                <button
                                    onClick={() => onUserDelete(user.username)}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {message !== '' && (
                <MessageComponent success={false} message={message} />
            )}
        </div>
    );
};

export default UserManagement;

