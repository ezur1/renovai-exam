import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import driversList from '../data/drivers.json';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async getDrivers(): Promise<Driver[]> {
    const drivers = await this.driverRepository.find();
    if (!drivers.length) {
      return this.driverRepository.save(driversList);
    }
    return drivers;
  }

  async getDriverById(driverId: string): Promise<Driver> {
    return this.driverRepository.findOne({
      where: { id: driverId },
    });
  }

  async unassignDriver(driverId: string) {
    const driver = await this.getDriverById(driverId);
    if (!driver) throw new NotFoundException('Driver not found');
    driver.assignedAssignmentId = null;
    return this.driverRepository.save(driver);
  }

  async assignAssignmentToDriver(driverId: string, assignmentId: string) {
    const driver = await this.getDriverById(driverId);
    if (!driver) throw new NotFoundException('Driver not found');
    driver.assignedAssignmentId = assignmentId;
    return this.driverRepository.save(driver);
  }
}
