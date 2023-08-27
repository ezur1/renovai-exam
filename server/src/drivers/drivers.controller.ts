import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}
  
  @Get()
  getDrivers() {
    return this.driversService.getDrivers();
  }
}
