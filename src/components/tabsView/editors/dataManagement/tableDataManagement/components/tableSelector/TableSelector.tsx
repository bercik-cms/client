import React, { useMemo } from 'react';
import { TableInfo } from '../../../../../../../api/schema/schemaInfo';
import BercikSelect, {
    SelectOptionInterface,
} from '../../../../../../selectComponent/BercikSelect';

interface Props {
    tables: Array<TableInfo>;
    selected: number;

    onSelect: (newSel: number) => void;
}

const TableSelector: React.FC<Props> = ({ tables, selected, onSelect }) => {
    let options = useMemo<Array<SelectOptionInterface>>(
        () =>
            tables.map((it) => ({
                value: it.table_name,
                label: it.table_name,
            })),
        tables
    );

    let selectedLabel = options[selected] || null;

    function handleSelect(newSel: SelectOptionInterface) {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === newSel.value) {
                onSelect(i);
                return;
            }
        }
        console.error({
            message: "TableSelector error: couldn't handle select",
            newSel,
            options,
        });
    }

    return (
        <BercikSelect
            options={options}
            selected={selectedLabel}
            onSelect={handleSelect}
        />
    );
};

export default TableSelector;
