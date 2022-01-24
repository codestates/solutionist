import { Request, Response } from 'express';
import Container from 'typedi';
import { RecordService } from '../../service/records';
import errorGenerator from '../../error/errorGenerator';

const submit = async (req: Request, res: Response) => {
  const recordId = Number(req.params['recordId']);
  const answerRate = req.body['answerRate'];

  // 데이터가 누락되거나 유효하지 않을 경우
  if (!recordId) {
    errorGenerator({ msg: 'empty or invalid record id', statusCode: 400 });
  }
  if (answerRate == null) {
    errorGenerator({ msg: 'empty or invalid answer rate', statusCode: 400 });
  }

  // solveRecords 테이블 이용을 위한 recordsService 인스턴스
  const recordServiceInstance: RecordService = Container.get(RecordService);

  // 유효한 record id인지 확인
  await recordServiceInstance.checkValidRecord(recordId);

  // 전체 정답률 집계
  // 정답률을 집계할 수 없는 경우 => 모든 문제가 설문일 때 -1 저장
  const submmitedId = await recordServiceInstance.submitRecord(recordId, answerRate);

  res.status(201).json({
    id: submmitedId,
  });
};
export default submit;
