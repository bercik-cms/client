import React from 'react';
import ColumnAction from './columnAction/ColumnAction';
import RowAction from './rowAction/RowAction';
import styles from './TableView.module.css';

interface Props {
    headers: Array<string>;
    rows: Array<Array<string>>;

    onAscending: (columnIndex: number) => void;
    onDescending: (columnIndex: number) => void;

    onDelete: (rowIndex: number) => void;
    onEdit: (rowIndex: number) => void;
}

const TableView: React.FC<Props> = ({
    headers,
    rows,
    onAscending,
    onDescending,
    onEdit,
    onDelete,
}) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.tableHeadRow}>
                    <td style={{ opacity: '0' }}></td>
                    {headers.map((val, i) => (
                        <th className={styles.tableHeadColumn} key={i}>
                            <div className={styles.headDiv}>
                                <p>{val}</p>
                                <ColumnAction
                                    onAscending={() => onAscending(i)}
                                    onDescending={() => onDescending(i)}
                                />
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={styles.tableBodyRow}>
                        <td style={{ padding: 0 }}>
                            <RowAction
                                onEdit={() => onEdit(rowIndex)}
                                onDelete={() => onDelete(rowIndex)}
                            />
                        </td>
                        {row.map((col, colIndex) => (
                            <td
                                key={colIndex}
                                className={styles.tableBodyColumn}
                            >
                                {col}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableView;
