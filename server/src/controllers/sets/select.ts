import { Request, Response } from 'express';
import Container from 'typedi';
import { SetService } from '../../service/sets';
import { RecordService } from '../../service/records';
import errorGenerator from '../../error/errorGenerator';

const select = async (req: Request, res: Response) => {
  const setId = Number(req.params['setId']);

  // setId가 유효하지 않을 경우
  if (!setId) {
    errorGenerator({ msg: 'empty or invalid set id', statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);
  // 세트 선택
  const selectedSet = await setServiceInstance.selectSet(Number(setId));

  // solveRecords 테이블 이용을 위한 recordsService 인스턴스
  const recordsServiceInstance: RecordService = Container.get(RecordService);
  const solvedUserNumber = await recordsServiceInstance.countRecord(setId);

  res.status(200).json({
    solvedUserNumber,
    ...selectedSet,
  });
};
export default select;
