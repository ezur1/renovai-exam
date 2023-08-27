import { Module, forwardRef } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { AssignmentsModule } from 'assignment/assignments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { Assignment } from '../assignment/assignment.entity';

@Module({
  imports: [
    forwardRef(() => AssignmentsModule),
    TypeOrmModule.forFeature([Driver, Assignment]),
  ],
  controllers: [DriversController],
  providers: [DriversService],
  exports: [DriversService],
})
export class DriversModule {}
