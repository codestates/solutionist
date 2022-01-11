import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { users } from './users';
import { sets } from './sets';

@Entity()
export class solvedSets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  setId: number;

  @Column({
    nullable: true,
  })
  userId: number;

  @Column({
    default: 0,
  })
  answerRate: number;

  @ManyToOne(() => sets, (set) => set.id, {
    onDelete: 'CASCADE',
  })
  set: sets;

  @ManyToOne(() => users, (user) => user.id)
  user: users;
}
