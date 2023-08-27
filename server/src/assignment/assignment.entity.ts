import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Driver } from '../drivers/driver.entity';

export type Task = {
  taskID: string;
  type: string;
};

// Assignment Entity
@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  lineDisplayId: string;
  
  @Column({ type: 'varchar', unique: true })
  lineId: string;

  @Column('json')
  tasks: Task[];

  @Column({ nullable: true })
  assignedDriverId: string;

  @OneToOne(() => Driver)
  @JoinColumn({ name: 'assignedDriverId' })
  assignedDriver?: Driver;
}
