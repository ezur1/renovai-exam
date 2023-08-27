import { createAsyncThunk } from "@reduxjs/toolkit";
import { driverService } from "@/services/driver.service";
import { assignmentService } from "@/services/assignment.service";

const fetchInitialData = createAsyncThunk("fetchInitialData", async () => {
  const driversPromise = driverService.getDrivers();
  const assignmentsPromise = assignmentService.getAssignments();
  return Promise.allSettled([driversPromise, assignmentsPromise]).then(
    (results) => {
      const [driverResult, assignmentResult] = results;
      let drivers, assignments;

      if (driverResult.status === "fulfilled") {
        drivers = driverResult.value;
      } else {
        console.error("Error fetching drivers:", driverResult.reason);
      }

      if (assignmentResult.status === "fulfilled") {
        assignments = assignmentResult.value;
      } else {
        console.error("Error fetching assignments:", assignmentResult.reason);
      }

      if (drivers && assignments) {
        return { drivers, assignments };
      }
    }
  );
});
const assignDriverToAssignment = createAsyncThunk(
  "assignDriverToAssignment",
  async (payload: { assignmentId: string; driverId: string }) => {
    return assignmentService.assignDriverToAssignment(
      payload.assignmentId,
      payload.driverId
    );
  }
);

export { fetchInitialData, assignDriverToAssignment };
