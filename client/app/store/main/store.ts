import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Driver, Assignment } from "@/types/types";
import { fetchInitialData, assignDriverToAssignment } from "./thunk";

export type initialState = {
  drivers: Driver[];
  assignments: Assignment[];
};

const initialState: initialState = {
  drivers: [],
  assignments: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{ drivers: any[]; assignments: any[] }>
    ) => {
      state.drivers = action.payload.drivers;
      state.assignments = action.payload.assignments;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      state.drivers = action.payload?.drivers || [];
      state.assignments = action.payload?.assignments || [];
    });
    builder.addCase(assignDriverToAssignment.fulfilled, (state, action) => {
      const assignment = action.payload.assignment;
      const driver = action.payload.driver;
      const preAssignedAssignment = action.payload.preAssignedAssignment;
      const preAssignedDriver = action.payload.preAssignedDriver;
      console.log("assignment", assignment);
      console.log("driver", driver);
      console.log("preAssignedAssignment", preAssignedAssignment);
      console.log("preAssignedDriver", preAssignedDriver);
      debugger;

      if (driver) {
        const driverIndex = state.drivers.findIndex(
          (currDriver) => currDriver.id === driver.id
        );
        state.drivers[driverIndex] = driver;
      }
      if (preAssignedDriver) {
        const driverIndex = state.drivers.findIndex(
          (currDriver) => currDriver.id === preAssignedDriver.id
        );
        state.drivers[driverIndex] = preAssignedDriver;
      }
      if (assignment) {
        const assignmentIndex = state.assignments.findIndex(
          (currAssignment) =>
            currAssignment.lineDisplayId === assignment.lineDisplayId
        );
        state.assignments[assignmentIndex] = assignment;
      }
      if (preAssignedAssignment) {
        const assignmentIndex = state.assignments.findIndex(
          (currAssignment) =>
            currAssignment.lineDisplayId === preAssignedAssignment.lineDisplayId
        );
        state.assignments = [
          ...state.assignments.slice(0, assignmentIndex),
          preAssignedAssignment,
          ...state.assignments.slice(assignmentIndex + 1),
        ];
        // state.assignments[assignmentIndex] = preAssignedAssignment;
      }
    });
  },
});

export const { setData } = mainSlice.actions;
export default mainSlice.reducer;
