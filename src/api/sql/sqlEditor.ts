import axios from 'axios';
import { TableData } from '../dataManagement/table_data';

// pub struct ExecuteQueriesRequest {
//     pub queries: Vec<String>,
//     pub diff_query: String,
//     pub should_diff_query: bool,
//     pub should_diff_mermaid: bool,
//     pub execute: bool,
// }

export interface ExecuteQueriesRequest {
    queries: Array<string>;
    diff_query: string;
    should_diff_query: boolean;
    should_diff_mermaid: boolean;
    execute: boolean;
}

// pub struct ExecuteQueriesResponse {
//     pub query_results: Vec<ArbitrarySqlArrayRowsAndNames>,
//     pub query_diff: Option<Vec<ArbitrarySqlArrayRowsAndNames>>,
//     pub mermaid_diff: Option<Vec<String>>,
// }

export interface ExecuteQueriesResponse {
    query_results: Array<TableData>;
    query_diff: Array<TableData> | null;
    mermaid_diff: Array<string> | null;
}

export function apiSqlEditor(
    req: ExecuteQueriesRequest
): Promise<ExecuteQueriesResponse> {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/execute-queries', req)
            .then((resp) => resolve(resp.data))
            .catch((err) => reject(err.response.data));
    });
}
