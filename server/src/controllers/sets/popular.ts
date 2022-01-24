import { Request, Response } from 'express';
import Container from 'typedi';
import { SetService } from '../../service/sets';
import errorGenerator from '../../error/errorGenerator';

const popular = async (req: Request, res: Response) => {
  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  // 세트 버전 조회
  const versions = await setServiceInstance.findPopular();

  res.status(200).json(versions);
};
export default popular;
