import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SelectDropdown from './selectDropdown/SelectDropdown';

export interface SelectOptionInterface {
    value: string,
    label: string,
};

interface Props {
    options: Array<SelectOptionInterface>,
    selected: SelectOptionInterface,

    onSelect: (option: SelectOptionInterface) => void,
};

const BercikSelect: React.FC<Props> = ({ options, selected, onSelect }) => {
    console.log(`BercikSelect: ${selected.value}`);
    let [dropdownOpen, setDropdownOpen] = useState(false);

    return <div>
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selected.label}
            <FontAwesomeIcon icon={dropdownOpen ? faArrowUp : faArrowDown} />
        </button>
        {dropdownOpen && <SelectDropdown
            options={options}
            onSelect={val => { setDropdownOpen(false); onSelect(val); }}
            onLoseFocus={() => setDropdownOpen(false)}
        />}
    </div>;
};

export default BercikSelect;