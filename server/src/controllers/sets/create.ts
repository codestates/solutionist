import { Request, Response } from 'express';
import Container from 'typedi';
import { ISets } from '../../interface/ISets';
import { IUsers } from '../../interface/IUsers';
import { SetService } from '../../service/sets';
import errorGenerator from '../../error/errorGenerator';
import { checkEmptyObject } from '../../utils/custom';

const create = async (req: Request, res: Response) => {
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => null 값 할당
  const userInfo: IUsers = res.locals.userInfo
    ? res.locals.userInfo
    : { id: null, username: null };
  const setDTO: ISets = req.body;

  // 데이터가 누락됐을 경우
  if (checkEmptyObject(setDTO)) {
    errorGenerator({ msg: 'null body', statusCode: 400 });
  }

  // 세트 id가 있을 경우 => 중복 생성 방지
  if (setDTO.id) {
    errorGenerator({ msg: 'duplicate set id', statusCode: 409 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setsServiceInstance: SetService = Container.get(SetService);

  // 세트 작성 정보 세팅
  setDTO.editorId = null;

  // 세트 생성
  const setInfo = await setsServiceInstance.createSet(setDTO, userInfo.id);

  res.status(201).json({
    username: userInfo.username,
    ...setInfo,
  });
};
export default create;
