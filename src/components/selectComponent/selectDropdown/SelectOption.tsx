import React from 'react';

interface Props {
    option: string,
    onSelect: () => void,
};

// TODO: use in the future, show matching fragmens of query
const SelectOption: React.FC<Props> = ({ option, onSelect }) => {

    return <button
        onClick={onSelect}
    >
        {option}
    </button>;
};

export default SelectOption;