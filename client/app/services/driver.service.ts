import { httpService } from "./http.service";
import { Driver } from "../types/types";

const STORAGE_KEY = "drivers";

export const driverService = {
  getDrivers,
};

async function getDrivers(): Promise<Driver[]> {
  return httpService.get(`${STORAGE_KEY}`);
}
