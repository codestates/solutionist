import { Request, Response } from 'express';
import Container from 'typedi';
import { CollectionService } from '../../service/collections';
import errorGenerator from '../../error/errorGenerator';

const remove = async (req: Request, res: Response) => {
  const collectionId = Number(req.params['collectionId']);

  // 쿼리 값이 부적합할 경우
  if (!collectionId) {
    errorGenerator({ msg: 'empty or invalid collection id', statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const collectionServiceInstance: CollectionService = Container.get(CollectionService);
  // collection 삭제
  await collectionServiceInstance.removeCollection(collectionId);

  res.status(200).json({ id: collectionId });
};
export default remove;
