import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignment.entity';
import { DriversService } from 'drivers/drivers.service';
import assignmentsList from '../data/assignments.json';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @Inject(forwardRef(() => DriversService))
    private driversService: DriversService,
  ) {}

  async getAssignments(): Promise<Assignment[]> {
    const assignments = await this.assignmentRepository.find();
    if (!assignments.length) {
      return this.assignmentRepository.save(assignmentsList);
    }
    return assignments;
  }

  async assignDriverToAssignment(assignmentId: string, driverId: string) {
    let preAssignedAssignment, preAssignedDriver;
    const assignment = await this.assignmentRepository.findOne({
      where: { lineDisplayId: assignmentId },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    const driver = await this.driversService.getDriverById(driverId);
    if (!driver) throw new NotFoundException('Driver not found');
  
    if (assignment.assignedDriverId) {
      preAssignedDriver = await this.driversService.unassignDriver(
        assignment.assignedDriverId,
      );
    }
    if (driver.assignedAssignmentId) {
      preAssignedAssignment = await this.assignmentRepository.findOne({
        where: { lineDisplayId: driver.assignedAssignmentId },
      });
    }

    assignment.assignedDriverId = driverId;
    const updatedAssignment = await this.assignmentRepository.save(assignment);

    const updatedDriver = await this.driversService.assignAssignmentToDriver(
      driverId,
      assignmentId,
    );
    
    return {
      assignment: updatedAssignment,
      driver: updatedDriver,
      preAssignedAssignment,
      preAssignedDriver,
    };
  }
}
