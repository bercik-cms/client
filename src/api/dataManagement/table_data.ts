import axios from 'axios';

export interface WhereClause {
    type: 'None' | 'ColumnEquals' | 'Custom';
    content?: undefined | { col_name: string; equals: string } | string;
}

export interface Sorting {
    type: 'None' | 'ColumnDescending' | 'ColumnAscending' | 'CustomExpression';
    content?: undefined | string;
}

export interface GetTableDataRequest {
    table_name: string;
    where_clause: WhereClause;
    sorting: Sorting;
}

export interface TableData {
    names: Array<string>;
    rows: Array<Array<string>>;
}

export function getTableData(r: GetTableDataRequest): Promise<TableData> {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/get-table-data', r)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err.response.data));
    });
}
