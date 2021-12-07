import axios from 'axios';

export interface ExternalReferenceInfo {
    table_name: string;
    column_name: string;
    references_column: string;
}

export interface SpecialColumnType {
    type: 'PrimaryKey' | 'ForeignKey';
    content?:
        | {
              references_table: string;
              references_column: string;
          }
        | undefined;
}

export interface ColumnInfo {
    name: string;
    data_type: string;
    is_nullable: boolean;
    column_default: string;
    special_info: SpecialColumnType | null;
}

export interface TableInfo {
    table_name: string;
    columns: Array<ColumnInfo>;
    external_references: Array<ExternalReferenceInfo>;
}

function getSchemaInfo(): Promise<Array<TableInfo>> {
    return new Promise((resolve, reject) => {
        axios
            .get('/api/table-info')
            .then((data) => resolve(data.data))
            .catch((err) => reject(err.response.data));
    });
}

export default getSchemaInfo;
