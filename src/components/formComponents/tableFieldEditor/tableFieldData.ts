
export const tableDataType: { [name: string]: string; } = {
    Integer: "integer",
    Serial: "serial",
    RealNumber: "real number",
    String: "string",
    Text: "text",
    Date: "date",
    ForeignKey: "foreign key",
    ManyToMany: "many to many",
    CustomType: "custom type",
};

export const tableDataSelectValues = Object.entries(tableDataType)
    .map(([value, label]) => (
        { value: value, label: label }
    ));

export interface TableFieldData {
    name: string,
    type: string,
    notNull: boolean,
    default: string | null,
};

export const defaultTableFieldData: TableFieldData = {
    name: "Field name",
    type: tableDataType.Integer,
    notNull: true,
    default: null,
};
