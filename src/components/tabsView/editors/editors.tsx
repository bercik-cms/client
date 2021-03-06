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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
    faCode,
    faCogs,
    faDatabase,
    faFile,
    faFileCode,
    faPen,
    faPlus,
    faTable,
    faUserPlus,
    faUsers,
    faUsersCog
} from '@fortawesome/free-solid-svg-icons';

export interface EditorComponentProps {
    onChangeTabSubtitle: (subtitle: string) => void,
};

interface Editor {
    icon: IconDefinition,
    component: React.FC<EditorComponentProps>,
}

interface EditorFolder {
    icon: IconDefinition;
    editors: { [editorName: string]: Editor; };
}

type EditorTree = { [folderName: string]: EditorFolder; };

export function isCategory(names: Array<string>) {
    return names.length === 1;
}

export function isEditor(names: Array<string>) {
    return !isCategory(names);
}

const editors: EditorTree = {
    "Data management": {
        icon: faDatabase,
        editors: {
            "Table data management": { icon: faTable, component: TableDataManagement },
            "File management": { icon: faFile, component: FileManagement },
            "Data SQL editor": { icon: faCode, component: DataSqlEditor },
        }
    },
    "Schema editing": {
        icon: faTable,
        editors: {
            "Table creation": { icon: faPlus, component: TableCreation },
            "Table editing": { icon: faPen, component: TableEditing },
            "Schema SQL editor": { icon: faCode, component: SchemaSqlEditor },
        }
    },
    "Endpoint management": {
        icon: faCode,
        editors: {
            "Endpoint management": { icon: faCogs, component: EndpointManagement },
            "Template management": { icon: faFileCode, component: TemplateManagement },
        }
    },
    "User management": {
        icon: faUsers,
        editors: {
            "User creation": { icon: faUserPlus, component: UserCreation },
            "User management": { icon: faUsersCog, component: UserManagement },
        }
    }
};

interface EditorFolderElement {
    name: string,
    icon: IconDefinition,
}

export function getFolderElements(folderName: Array<string>): Array<EditorFolderElement> {
    if (folderName.length > 1)
        console.error(`getFolderElements(): Error folder name, should be at most 1 element: ${folderName}`);

    let result: Array<EditorFolderElement> = [];
    if (folderName.length === 0) {
        for (let [key, entry] of Object.entries(editors)) {
            result.push({ name: key, icon: entry.icon });
        }
    } else {
        let folder = editors[folderName[0]].editors;
        for (let [key, entry] of Object.entries(folder)) {
            result.push({ name: key, icon: entry.icon });
        }
    }
    return result;
}

export default editors;