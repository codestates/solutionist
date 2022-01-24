import { Request, Response } from 'express';
import Container from 'typedi';
import { RecordService } from '../../service/records';
import errorGenerator from '../../error/errorGenerator';
import { v4 } from 'uuid';

const record = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;
  const userId = userInfo ? userInfo.id : null;
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => null 값 할당
  const solver = userInfo ? userInfo.email : v4();
  const setId = req.body['setId'];

  // 데이터가 누락됐을 경우
  if (!setId) {
    errorGenerator({ msg: 'empty or invalid set id', statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const recordServiceInstance: RecordService = Container.get(RecordService);

  // 세트 선택
  const recordId = await recordServiceInstance.makeRecord(setId, userId);

  res.status(201).json({
    solver,
    recordId,
  });
};
export default record;
