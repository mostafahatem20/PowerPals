import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class NewsSticker {
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

  @ManyToOne(() => User, (user) => user.newsStickers)
  user: User;
}
