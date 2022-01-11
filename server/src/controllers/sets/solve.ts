import { Request, Response } from 'express';
import Container from 'typedi';
import { ISolve } from '../../interface/ISets';
import { IUsers } from '../../interface/IUsers';
import { StatusService } from '../../service/solvedStatus';
import errorGenerator from '../../error/errorGenerator';
import { emptyObjectCk } from '../../utils/custom';

const solve = async (req: Request, res: Response) => {
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => 빈 객체 할당
  const userInfo: IUsers = res.locals.userInfo ? res.locals.userInfo : {};

  const solveDTO: ISolve = req.body;
  // 데이터가 누락됐을 경우
  if (emptyObjectCk(solveDTO)) {
    errorGenerator({ statusCode: 400 });
  }

  // usersProblems 테이블 이용을 위한 usersProblems 인스턴스
  const statusServiceInstance: StatusService = Container.get(StatusService);

  // 선택 비율 집계
  const solveResponse = await statusServiceInstance.SelectionRateCalculator(
    solveDTO,
    userInfo.eamil
  );

  res.status(201).json(solveResponse);
};
export default solve;
