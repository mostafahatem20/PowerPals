import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  Ziele: boolean;

  @Column({ default: false })
  Erzeugung: boolean;

  @Column({ default: false })
  Nahbereisabfrage: boolean;

  @Column({ default: false })
  Registrierung: boolean;

  @Column({ default: false })
  Statuten: boolean;

  @Column({ default: false })
  Vereinsbehörde: boolean;

  @Column({ default: false })
  Gründungsbescheid: boolean;

  @Column({ default: false })
  Vereinbarung_1: boolean;

  @Column({ default: false })
  Vereinbarung_2: boolean;

  @Column({ default: false })
  Regelungen: boolean;

  @Column({ default: false })
  ebutilities: boolean;

  @Column({ default: false })
  Marktpartner_ID: boolean;

  @Column({ default: false })
  Netzbetreiber: boolean;

  @Column({ default: false })
  Vertragsvorbereitung: boolean;

  @Column({ default: false })
  Vertragsfertigstellung: boolean;

  @Column({ default: false })
  EDA: boolean;

  @Column({ default: false })
  Angelegt: boolean;

  @Column({ default: false })
  Freigeschaltet: boolean;

  @Column({ default: false })
  Ausgestattet: boolean;

  @Column({ default: false })
  Zugestimmt: boolean;

  @OneToOne(() => User, (user) => user.community)
  user: User;
}
