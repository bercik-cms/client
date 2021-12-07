import { DataEntryValue } from '../../components/tabsView/editors/dataManagement/tableDataManagement/components/dataEntry/DataEntry';
import axios from 'axios';

function apiInsertData(table_name: string, values: Array<DataEntryValue>) {
    console.log({ table_name, values });
    return new Promise((resolve, reject) => {
        axios
            .post('/api/insert-data', { table_name, values })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err.response.data));
    });
}

export default apiInsertData;
