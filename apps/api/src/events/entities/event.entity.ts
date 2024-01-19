import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column({ type: 'timestamp' }) // Use appropriate type based on your database
  eventDateTime: Date;

  @Column()
  addressName: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  postalCode: number;

  @Column()
  city: string;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'float' })
  lng: number;

  @Column()
  info: string;

  // Many Events are created by One User
  @ManyToOne(() => User, (user) => user.events)
  createdBy: User;

  // Many Events can be attended by Many Users
  @ManyToMany(() => User, (user) => user.events)
  users: User[];
}
