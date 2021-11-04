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
    name: string,
    icon: string,
    component: React.FC,
}

type EditorTree = { [name: string]: Array<Editor>; };

const editors: EditorTree = {
    "Data management": [
        { name: "Manage table data", icon: "", component: TableDataManagement },
        { name: "Manage files", icon: "", component: FileManagement },
        { name: "Data SQL editor", icon: "", component: DataSqlEditor },
    ],
    "Schema editing": [
        { name: "Create table", icon: "", component: TableEditing },
        { name: "Edit tables", icon: "", component: TableCreation },
        { name: "Schema SQL editor", icon: "", component: SchemaSqlEditor },
    ],
    "Endpoint management": [
        { name: "Manage endpoints", icon: "", component: EndpointManagement },
        { name: "Manage templates", icon: "", component: TemplateManagement },
    ],
    "User management": [
        { name: "Create user", icon: "", component: UserCreation },
        { name: "Manage users", icon: "", component: UserManagement },
    ]
};

export default editors;