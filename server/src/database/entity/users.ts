import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { collections } from './collections';
import { sets } from './sets';
import { solveRecords } from './solveRecords';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  // @Column()
  // salt: string;

  @Column({
    nullable: true,
  })
  profileImage: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 'normal' })
  type: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @OneToMany(() => collections, (collection) => collection.creator)
  collection: collections[];

  @OneToMany(() => sets, (set) => set.editor)
  set: sets[];

  @OneToMany(() => solveRecords, (record) => record.user)
  solved: solveRecords[];
}
