import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UsersProfile } from '../../users-profiles/entities/users-profile.entity';

export enum UserType {
  USER = 'user',
  ORGANIZER = 'organizer',
  COMMUNITY_LEADER = 'community_leader',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.USER,
  })
  type: UserType;

  @Column()
  password: string;

  @OneToOne(() => UsersProfile, (userProfile) => userProfile.user, {
    cascade: true,
  })
  @JoinColumn()
  profile: UsersProfile;
}
