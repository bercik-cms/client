import React, { useRef, useState } from 'react';
import { toClassNames } from '../../../util/toClassNames';
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
        if (
            e.relatedTarget === null
            || !e.currentTarget.contains(e.relatedTarget)
        ) onLoseFocus();
    }

    function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && matching.length >= 1) {
            onSelect(matching[0]);
        }
    }

    return <div onBlur={onBlur} className={styles.dropdownDiv}>
        <input type="text"
            className={styles.textInput}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={handleEnter}
            ref={r => r?.focus()}
        />
        <div className={styles.buttonHolder}>
            {matching.map((value, index) => (
                <button
                    className={toClassNames({
                        [styles.optionButton]: true,
                        [styles.firstButton]: index === 0,
                    })}
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