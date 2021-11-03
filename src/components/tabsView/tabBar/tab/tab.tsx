import React from 'react';

export interface Props {
    tabName: string;
    selected: boolean;

    onSelect: () => void,
    onClose: () => void,
}

const Tab: React.FC<Props> = ({ tabName, selected, onSelect, onClose }) => {

    return <div onClick={() => !selected && onSelect()}>
        <p>{tabName}</p>
        <button onClick={() => !selected && onClose()}>X</button>
    </div >;
};

export default Tab;