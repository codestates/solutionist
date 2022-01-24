import { Request, Response } from 'express';
import Container from 'typedi';
import { SetService } from '../../service/sets';
import errorGenerator from '../../error/errorGenerator';

const version = async (req: Request, res: Response) => {
  const collectionId = Number(req.params['collectionId']);

  // collection id가 유효하지 않을 경우
  if (!collectionId) {
    errorGenerator({ msg: 'empty or invalid collection id', statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  // 세트 버전 조회
  const versions = await setServiceInstance.findVersion(collectionId);

  res.status(200).json(versions);
};
export default version;
