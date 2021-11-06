import React from 'react';
import DataSqlEditor from './dataManagement/dataSqlEditor/DataSqlEditor';
import FileManagement from './dataManagement/fileManagement/FileManagement';
import TableDataManagement from './dataManagement/tableDataManagement/TableDataManagement';
import EndpointManagement from './endpointManagement/endpointManagement/EndpointManagement';
import TemplateManagement from './endpointManagement/templateManagement/TemplateManagement';
import SchemaSqlEditor from './schemaEditing/schemaSqlEditor/SchemaSqlEditor';
import TableCreation from './schemaEditing/tableCreation/TableCreation';
import TableEditing from './schemaEditing/tableEditing/TableEditing';
import UserCreation from './userManagement/userCreation/UserCreation';
import UserManagement from './userManagement/userManagement/UserManagement';

interface Editor {
    icon: string,
    component: React.FC,
}

type EditorTree = { [categoryName: string]: { [editorName: string]: Editor; }; };

export function isCategory(names: Array<string>) {
    return names.length === 1;
}

export function isEditor(names: Array<string>) {
    return !isCategory(names);
}

const editors: EditorTree = {
    "Data management": {
        "Manage table data": { icon: "", component: TableDataManagement },
        "Manage files": { icon: "", component: FileManagement },
        "Data SQL editor": { icon: "", component: DataSqlEditor },
    },
    "Schema editing": {
        "Create table": { icon: "", component: TableEditing },
        "Edit tables": { icon: "", component: TableCreation },
        "Schema SQL editor": { icon: "", component: SchemaSqlEditor },
    },
    "Endpoint management": {
        "Manage endpoints": { icon: "", component: EndpointManagement },
        "Manage templates": { icon: "", component: TemplateManagement },
    },
    "User management": {
        "Create user": { icon: "", component: UserCreation },
        "Manage users": { icon: "", component: UserManagement },
    }
};

export default editors;