import { Module, forwardRef } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { DriversModule } from 'drivers/drivers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';

@Module({
  imports: [
    forwardRef(() => DriversModule),
    TypeOrmModule.forFeature([Assignment]),
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
