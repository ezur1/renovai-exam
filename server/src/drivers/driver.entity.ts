import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Assignment } from '../assignment/assignment.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  group: string;

  @Column({ nullable: true })
  assignedAssignmentId: string;

  @OneToOne(() => Assignment)
  @JoinColumn({ name: 'assignedAssignmentId' })
  assignedAssignment?: Assignment;
}
