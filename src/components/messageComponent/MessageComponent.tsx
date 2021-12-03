import React from 'react';
import { toClassNames } from '../../util/toClassNames';
import styles from './MessageComponent.module.css';

export interface MessageComponentProps {
    success: boolean,
    message: string,
}

const MessageComponent: React.FC<MessageComponentProps> = ({ success, message }) => {
    return <div className={toClassNames({
        [styles.container]: true,
        [styles.failContainer]: !success,
    })}>
        <p className={styles.text}>{message}</p>
    </div>;
};

export default MessageComponent;