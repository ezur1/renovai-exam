import Select from "./Select";
import { TableColumn } from "@/types/types";

interface TableProps<T> {
  data: T[];
  columns: TableColumn[];
}

export default function Table<T>({ data, columns }: TableProps<T>) {
  function getValueByPath(obj: any, path: string): string {
    const parts = path.split(".");
    let current = obj;
    for (const part of parts) {
      if (current === null || typeof current !== "object") {
        return "N/A";
      }
      const match = /^(\w+)\[(\d+)\]$/.exec(part);
      if (match) {
        const [, key, index] = match;
        current = current[key]?.[index];
      } else {
        current = current[part];
      }
    }
    return current;
  }

  function hasProperty(obj: any, prop: string): boolean {
    return obj && prop in obj;
  }

  return (
    <div>
      <table className="main-table">
        <thead>
          <tr>
            {columns.map((column, colIndex) => (
              <th key={colIndex}>
                <div className="flex items-center">
                  <span>{column.title}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, rowColIndex) => (
                <td key={rowColIndex}>
                  {column.actions ? (
                    <Select
                      defaultValue={column.actions.defaultValue}
                      options={column.actions.options}
                      value={
                        hasProperty(row, column.actions.valueColumnKey)
                          ? (row[
                              column.actions.valueColumnKey as keyof T
                            ] as string)
                          : undefined
                      }
                      onChange={(e) => {
                        column.actions?.onChange(e, row);
                      }}
                    />
                  ) : (
                    getValueByPath(row, column.field)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
