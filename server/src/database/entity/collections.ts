import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  Timestamp,
} from 'typeorm';
import { sets } from './sets';
import { users } from './users';

@Entity()
export class collections {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  creatorId: number;

  @CreateDateColumn()
  createdAt: Timestamp;

  @ManyToOne(() => users, (user) => user.id)
  creator: users;

  @OneToMany(() => sets, (set) => set.collection, {
    cascade: true,
  })
  set: sets[];
}
