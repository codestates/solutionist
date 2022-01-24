import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { problems } from './problems';

@Entity()
export class choices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @Column()
  index: number;

  @Column()
  content: string;

  @Column()
  selectionRate: number;

  @ManyToOne(() => problems, (problem) => problem.id, {
    onDelete: 'CASCADE',
  })
  problem: problems;
  m;
}
