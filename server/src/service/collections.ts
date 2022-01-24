import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CollectionsRepository } from '../database/repository/collections';

@Service()
export class CollectionService {
  constructor(@InjectRepository() private collectionRepo: CollectionsRepository) {}

  async removeCollection(collectionId: number): Promise<void> {
    await this.collectionRepo.delete({ id: collectionId });
  }
}
