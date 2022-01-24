import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { problems } from './problems';
import { solveRecords } from './solveRecords';

@Entity()
export class solveStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  solver: string;

  @Column()
  problemId: number;

  @Column()
  choice: number;

  @Column()
  recordId: number;

  @ManyToOne(() => problems, (problem) => problem.id, {
    onDelete: 'CASCADE',
  })
  problem: problems;

  @ManyToOne(() => solveRecords, (record) => record.id, {
    onDelete: 'CASCADE',
  })
  record: solveRecords[];
}
