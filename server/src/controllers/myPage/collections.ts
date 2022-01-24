import { Request, Response } from 'express';
import { IUsers } from '../../interface/IUsers';
import { SetService } from '../../service/sets';
import Container from 'typedi';

const collections = async (req: Request, res: Response) => {
  const userInfo: IUsers = res.locals.userInfo;

  const setsServiceInstance: SetService = Container.get(SetService);

  const findSet = await setsServiceInstance.findSetsId(userInfo.id);
  // const test = await recordsServiceInstance.countRecord(setId);
  return res.status(200).json({ findSet });

  // console.log(111, test);
};

export default collections;
