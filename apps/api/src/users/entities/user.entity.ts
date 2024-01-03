import { Event } from 'src/events/entities/event.entity';
import { NewsSticker } from 'src/news-stickers/entities/news-sticker.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UsersProfile } from '../../users-profiles/entities/users-profile.entity';
import { Wiki } from '../../wikis/entities/wiki.entity';
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

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => UsersProfile, (userProfile) => userProfile.user, {
    cascade: true,
  })
  @JoinColumn()
  profile: UsersProfile;

  @OneToMany(() => Wiki, (wiki) => wiki.user)
  wikis: Wiki[];

  @OneToMany(() => NewsSticker, (newsSticker) => newsSticker.user)
  newsStickers: NewsSticker[];

  @OneToMany(() => Event, (event) => event.createdBy)
  events: Event[];

  // Many Users can attend Many Events
  @ManyToMany(() => Event, (event) => event.users)
  @JoinTable({
    name: 'users_events', // table name for the junction table of this relation
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'event',
      referencedColumnName: 'id',
    },
  })
  eventsRegistration: Event[];
}
