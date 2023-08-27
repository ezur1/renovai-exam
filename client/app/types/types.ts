export type Driver = {
  id: string;
  name: string;
  phone: string;
  group: string;
  assignedAssignmentId?: string;
};

export type Task = {
  taskID: string;
  type: string;
};

export type Assignment = {
  assignedDriverId?: string;
  lineId: string;
  lineDisplayId: string;
  tasks: Task[];
};

export type TableColumn = {
  title: string;
  field: string;
  actions?: {
    valueColumnKey: keyof Driver | keyof Assignment;
    defaultValue: string;
    options: { value: string; label: string }[];
    onChange: (value: string, data?: any) => void;
  };
};
