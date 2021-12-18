import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SelectDropdown from './selectDropdown/SelectDropdown';
import styles from './BercikSelect.module.css';

export interface SelectOptionInterface {
    value: string;
    label: string;
}

interface Props {
    options: Array<SelectOptionInterface>;
    selected: SelectOptionInterface | null;

    onSelect: (option: SelectOptionInterface) => void;
}

const BercikSelect: React.FC<Props> = ({ options, selected, onSelect }) => {
    let [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className={styles.topDiv}>
            <button
                className={styles.mainButton}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                {selected !== null ? selected.label : 'select value'}
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={dropdownOpen ? faArrowUp : faArrowDown}
                />
            </button>
            {dropdownOpen && (
                <SelectDropdown
                    options={options}
                    onSelect={(val) => {
                        setDropdownOpen(false);
                        onSelect(val);
                    }}
                    onLoseFocus={() => setDropdownOpen(false)}
                />
            )}
        </div>
    );
};

export default BercikSelect;
