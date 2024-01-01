import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum UserProfileType {
  PRIVAT = 'Privat',
  GEWERBLICH = 'Gewerblich',
  GEMEINDE = 'Gemeinde',
}

@Entity()
export class UsersProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  telephoneNumber: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({
    type: 'enum',
    enum: UserProfileType,
    nullable: true,
  })
  type: UserProfileType;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  solar: boolean;

  @Column({ nullable: true })
  electricityStorage: boolean;

  @Column({ nullable: true })
  addressName: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  postalCode: number;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'float', nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  lng: number;

  @Column({ nullable: true })
  meterNumber: string;

  @Column({ nullable: true })
  networkProvider: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
