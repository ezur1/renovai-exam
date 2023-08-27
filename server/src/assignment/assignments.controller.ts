import { Controller, Get, Param, Put } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly AssignmentsService: AssignmentsService) {}
  
  @Get()
  getAssignments() {
    return this.AssignmentsService.getAssignments();
  }

  @Put(':assignmentId/assignDriver/:driverId')
  assignDriverToAssignment(
    @Param('assignmentId') assignmentId: string,
    @Param('driverId') driverId: string,
  ) {
    return this.AssignmentsService.assignDriverToAssignment(
      assignmentId,
      driverId,
    );
  }
}
