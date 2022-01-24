import { EntityRepository, Repository } from 'typeorm';
import { solveRecords } from '../entity/solveRecords';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(solveRecords)
export class SolveRecordsRepository extends Repository<solveRecords> {
  // 세트 정답률 평균 반환
  async getAvgAnswerRate(id: number): Promise<number> {
    return await this.createQueryBuilder('records')
      .select('AVG(records.answerRate)', 'totalRate')
      .innerJoin(
        (qb) => qb.select().from(solveRecords, 'r').where(`r.id = ${id}`),
        'sr',
        'sr.setId = records.setId'
      )
      .where(`records.answerRate > -1`)
      .getRawOne()
      .then((result) => result.totalRate);
  }
}
