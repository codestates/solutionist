import { EntityRepository, Repository } from 'typeorm';
import { problems } from '../entity/problems';

@EntityRepository(problems)
export class ProblemsRepository extends Repository<problems> {}
