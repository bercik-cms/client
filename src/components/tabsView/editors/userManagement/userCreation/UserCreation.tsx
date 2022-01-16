import React, { useState } from 'react';
import { EditorComponentProps } from '../../editors';
import styles from './UserCreation.module.css';
import { apiCreateUsers } from '../../../../../api/users/createUsers';
import Spinner from '../../../../spinner/Spinner';
import MessageComponent from '../../../../messageComponent/MessageComponent';

interface Props extends EditorComponentProps {}

const UserCreation: React.FC<Props> = ({}) => {
    let [username, setUsername] = useState('');
    let [userGroup, setUserGroup] = useState('');
    let [userCount, setUserCount] = useState(1);

    let [loading, setLoading] = useState(false);
    let [usersInfo, setUsersInfo] = useState('');
    let [message, setMessage] = useState('');

    function onCreateUsers() {
        setLoading(true);
        apiCreateUsers({ username, amount: userCount, user_group: userGroup })
            .then(({ new_users }) => {
                let usersInfoString = new_users
                    .map(
                        (it) =>
                            `username: ${it.username}, password: ${it.password}`
                    )
                    .join('\n');

                setUsersInfo(usersInfoString);
                setMessage('');
                setLoading(false);
            })
            .catch((message) => {
                setMessage(message);
                setLoading(false);
            });
    }

    return (
        <div className={styles.containerDiv}>
            <h3>Creating users</h3>

            <p>User name template</p>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <p>User group</p>
            <input
                type="text"
                value={userGroup}
                onChange={(e) => setUserGroup(e.target.value.toUpperCase())}
            />

            <p>User count</p>
            <input
                type="number"
                min="1"
                value={userCount}
                step="1"
                onChange={(e) => setUserCount(+e.target.value)}
            />
            <br />

            <button onClick={() => onCreateUsers()}>Create users</button>

            {loading && <Spinner />}

            {message !== '' && (
                <MessageComponent success={false} message={message} />
            )}

            {usersInfo !== '' && (
                <>
                    <br />
                    <br />
                    <h3>Created users:</h3>
                    <div className={styles.resultDiv}>
                        <pre>
                            <code>{usersInfo}</code>
                        </pre>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserCreation;

