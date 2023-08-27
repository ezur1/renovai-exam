
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "@/store/store";
import Table from "@/components/Table";
import { TableColumn, Driver } from "@/types/types";
import { assignDriverToAssignment } from "@/store/main/thunk";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useMemo, useCallback } from "react";

export default function DriversTable() {
  const dispatch = useDispatch<AppDispatch>();

  const drivers = useSelector(
    (state: RootState) => state.main.drivers,
    shallowEqual
  );
  const assignments = useSelector(
    (state: RootState) => state.main.assignments,
    shallowEqual
  );

  const assignmentsDropdownOptions = useMemo(
    () =>
      assignments.map((assignment) => ({
        value: assignment.lineDisplayId,
        label: assignment.lineDisplayId,
        hidden: !!assignment.assignedDriverId,
      })),
    [assignments]
  );

  const onDriverChange = useCallback(
    (value: string, driver: Driver) => {
      dispatch(
        assignDriverToAssignment({
          assignmentId: value,
          driverId: driver.id,
        })
      );
    },
    [dispatch]
  );

  const driversColumns: TableColumn[] = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Assigned To",
      field: "actions",
      actions: {
        valueColumnKey: "assignedAssignmentId",
        defaultValue: "Select an assignment",
        options: assignmentsDropdownOptions,
        onChange: onDriverChange,
      },
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl ">Drivers</h1>
      <Table data={drivers} columns={driversColumns} />
    </div>
  );
}
