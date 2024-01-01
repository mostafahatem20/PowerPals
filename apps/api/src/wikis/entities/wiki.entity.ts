import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wiki {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  subHeading: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  tag: string;

  @ManyToOne(() => User, (user) => user.wikis)
  user: User;
}
