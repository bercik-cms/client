import { defaultTheme } from "react-select";

export const tableDataTypeLabels: { [name: string]: string; } = {
    Integer: "integer",
    Serial: "serial",
    RealNumber: "real number",
    String: "string",
    Text: "text",
    Date: "date",
    ForeignKey: "foreign key",
    CustomType: "custom type",
};

export const tableDataValuesWithLabels = Object.entries(tableDataTypeLabels)
    .map(([value, label]) => (
        { value: value, label: label }
    ));

export interface TableFieldData {
    name: string,
    type: string,
    customTypeValue: string,
    foreignKeyTableName: string | null,
    notNull: boolean,
    default: "None" | { "Value": string; };
};

export const defaultTableFieldData: TableFieldData = {
    name: "Field name",
    type: "Integer",
    customTypeValue: "",
    foreignKeyTableName: null,
    notNull: true,
    default: "None",
};

interface ApiTableFieldData {
    name: string,
    field_type: { type: string, content?: string | undefined, },
    not_null: boolean,
    default: "None" | { Value: string, },
}

const defaultApiField: ApiTableFieldData = {
    name: "",
    field_type: { type: "Integer" },
    not_null: true,
    default: "None",
};

export function tableFieldsToApiJson(fields: Array<TableFieldData>) {
    let result: Array<ApiTableFieldData> = [];

    for (let field of fields) {
        let apiField: ApiTableFieldData = { ...defaultApiField };

        apiField.name = field.name;

        apiField.field_type = {
            type: field.type,
            content: field.type === "CustomType"
                ? field.customTypeValue
                : undefined,
        };

        apiField.not_null = field.notNull;
        apiField.default = field.default;

        result.push(apiField);
    }

    return result;
}