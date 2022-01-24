import { EntityRepository, Repository } from 'typeorm';
import { choices } from '../entity/choices';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(choices)
export class ChoicesRepository extends Repository<choices> {
  async getLastChoice(problemId: number) {
    return this.createQueryBuilder('choices')
      .select('MAX(choices.index)', 'max')
      .where(`problemId=${problemId}`)
      .getRawOne()
      .then((result) => {
        return convertRawObject(result)['max'];
      });
  }

  async updateSelectionRate(problemId: number, selectionRate: number[]) {
    const choicesToSave = await this.find({ problemId }).then((result) => {
      return result.map((el, idx) => {
        el.selectionRate = selectionRate[idx];
        return el;
      });
    });
    await this.save(choicesToSave);
  }
}
