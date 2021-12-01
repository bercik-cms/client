import React, { useRef, useState } from 'react';
import { SelectOptionInterface } from '../BercikSelect';
import { fuzzySearchSelectOptions } from './fuzzySearch';

interface Props {
    options: Array<SelectOptionInterface>,
    onSelect: (option: SelectOptionInterface) => void,
    onLoseFocus: () => void,
};

const SelectDropdown: React.FC<Props> = ({ options, onSelect, onLoseFocus }) => {
    const [query, setQuery] = useState("");
    let matching = fuzzySearchSelectOptions(query, options);

    function onBlur(e: React.FocusEvent<HTMLDivElement, Element>) {
        if (e.relatedTarget === null) onLoseFocus();
    }

    return <div onBlur={onBlur}>
        <input type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            ref={r => r?.focus()}
        />
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