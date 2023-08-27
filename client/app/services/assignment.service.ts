import { httpService } from "./http.service";
import { Assignment, Driver } from "../types/types";

const STORAGE_KEY = "assignments";

export const assignmentService = {
  getAssignments,
  assignDriverToAssignment,
};

async function getAssignments(): Promise<Assignment[]> {
  return httpService.get(`${STORAGE_KEY}`);
}

async function assignDriverToAssignment(
  assignmentId: string,
  driverId: string
): Promise<{
  assignment: Assignment;
  driver: Driver;
  preAssignedAssignment: Assignment | undefined;
  preAssignedDriver: Driver | undefined;
}> {
  return httpService.put(
    `${STORAGE_KEY}/${assignmentId}/assignDriver/${driverId}`
  );
}
