import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { sets } from './sets';
import { problems } from './problems';

@Entity()
export class usersProblems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  setId: number;

  @Column()
  problemId: number;

  @Column()
  chocie: number;

  @ManyToOne(() => sets, (set) => set.id)
  set: sets;

  @ManyToOne(() => problems, (problem) => problem.id)
  problem: problems;
}