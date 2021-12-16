import React from 'react';
import { TableData } from '../../api/dataManagement/table_data';
import styles from './SimpleTable.module.css';

interface Props {
    data: TableData;
}

const SimpleTable: React.FC<Props> = ({ data }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {data.names.map((value, index) => (
                        <th key={index}>{value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((value, rowIndex) => (
                    <tr key={rowIndex}>
                        {value.map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SimpleTable;
