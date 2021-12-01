import React, { useRef, useState } from 'react';
import { setSyntheticLeadingComments } from 'typescript';
import { SelectOptionInterface } from '../BercikSelect';
import { fuzzySearchSelectOptions } from './fuzzySearch';
import styles from "./SelectDropdown.module.css";

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

    return <div onBlur={onBlur} className={styles.dropdownDiv}>
        <input type="text"
            className={styles.textInput}
            value={query}
            onChange={e => setQuery(e.target.value)}
            ref={r => r?.focus()}
        />
        <div className={styles.buttonHolder}>
            {matching.map((value, index) => (
                <button
                    className={styles.optionButton}
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