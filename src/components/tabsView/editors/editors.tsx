interface Editor {
    name: string,
    icon: string,
}

type EditorTree = { [name: string]: Array<Editor>; };

const editors: EditorTree = {
    "Data management": [
        { name: "Manage table data", icon: "" },
        { name: "Manage files", icon: "" },
        { name: "Data SQL editor", icon: "" },
    ],
    "Schema editing": [
        { name: "Create table", icon: "" },
        { name: "Edit tables", icon: "" },
        { name: "Schema SQL editor", icon: "" },
    ],
    "Endpoint management": [
        { name: "Manage endpoints", icon: "" },
        { name: "Manage templates", icon: "" },
    ],
    "User management": [
        { name: "Create user", icon: "" },
        { name: "Manage users", icon: "" },
    ]
};

export default editors;