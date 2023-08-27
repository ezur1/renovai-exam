
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "@/store/store";
import Table from "@/components/Table";
import { TableColumn, Assignment } from "@/types/types";
import { assignDriverToAssignment } from "@/store/main/thunk";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useMemo, useCallback } from "react";

export default function AssignmentsTable() {
  const dispatch = useDispatch<AppDispatch>();

  const drivers = useSelector(
    (state: RootState) => state.main.drivers,
    shallowEqual
  );
  const assignments = useSelector(
    (state: RootState) => state.main.assignments,
    shallowEqual
  );

  const driversDropdownOptions = useMemo(
    () =>
      drivers.map((driver) => ({
        value: driver.id,
        label: driver.name,
        hidden: !!driver.assignedAssignmentId,
      })),
    [drivers]
  );

  const onAssignmentChange = useCallback(
    (value: string, assignment: Assignment) => {
      dispatch(
        assignDriverToAssignment({
          assignmentId: assignment.lineDisplayId,
          driverId: value,
        })
      );
    },
    [dispatch]
  );

  const assignmentsColumns: TableColumn[] = [
    {
      title: "Assigned To Driver",
      field: "actions",
      actions: {
        valueColumnKey: "assignedDriverId",
        defaultValue: "Select a driver",
        options: driversDropdownOptions,
        onChange: onAssignmentChange,
      },
    },
    {
      title: "Task ID",
      field: "lineDisplayId",
    },
    {
      title: "Day 1",
      field: "tasks[0].type",
    },
    {
      title: "Day 2",
      field: "tasks[1].type",
    },
    {
      title: "Day 3",
      field: "tasks[2].type",
    },
    {
      title: "Day 4",
      field: "tasks[3].type",
    },
    {
      title: "Day 6",
      field: "tasks[5].type",
    },
    {
      title: "Day 7",
      field: "tasks[6].type",
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl ">Assignments</h1>
      <Table data={assignments} columns={assignmentsColumns} />
    </div>
  );
}

