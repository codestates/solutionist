import { EntityRepository, Repository } from 'typeorm';
import { solveStatus } from '../entity/solveStatus';

@EntityRepository(solveStatus)
export class SolveStatusRepository extends Repository<solveStatus> {
  // 보기 선택 카운트
  async countByChoice(problemId: number) {
    return await this.createQueryBuilder('status')
      .select('status.choice AS choice')
      .addSelect('COUNT(*) AS cnt')
      .where({ problemId })
      .groupBy('status.choice')
      .getRawMany();
  }

  // 해당 레코드에서 보기 선택 비율 조회
  async getSelectionRateByRecord(recordId: number) {
    return this.createQueryBuilder('status')
      .innerJoinAndSelect('status.problem', 'problems')
      .innerJoinAndSelect('problems.choice', 'choices')
      .where(`status.recordId=${recordId}`)
      .getMany();
  }

  // 기록 데이터 중복 확인
  async checkDuplicate(recordId: number, problemId: number): Promise<boolean> {
    return await this.createQueryBuilder('status')
      .innerJoinAndSelect('status.record', 'records')
      .where(`records.id = ${recordId}`)
      .andWhere(`status.problemId = ${problemId}`)
      .getCount()
      .then((result) => {
        return result > 0;
      });
  }
}
