import React, { useState } from 'react';
import { SelectOptionInterface } from '../BercikSelect';
import { fuzzySearchSelectOptions } from './fuzzySearch';

interface Props {
    options: Array<SelectOptionInterface>,
    onSelect: (option: SelectOptionInterface) => void,
};

const SelectDropdown: React.FC<Props> = ({ options, onSelect }) => {
    const [query, setQuery] = useState("");
    let matching = fuzzySearchSelectOptions(query, options);

    return <div>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
        <div>
            {matching.map((value, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(value)}
                >
                    {value.label}
                </button>
            ))}
        </div>
    </div>;
};

export default SelectDropdown;