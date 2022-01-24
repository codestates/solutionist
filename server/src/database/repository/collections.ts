import { EntityRepository, Repository } from 'typeorm';
import { collections } from '../entity/collections';

@EntityRepository(collections)
export class CollectionsRepository extends Repository<collections> {}
