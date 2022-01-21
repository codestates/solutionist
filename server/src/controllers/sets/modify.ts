import { Request, Response } from 'express';
import Container from 'typedi';
import { ISets } from '../../interface/ISets';
import { IUsers } from '../../interface/IUsers';
import { SetService } from '../../service/sets';
import errorGenerator from '../../error/errorGenerator';
import { checkEmptyObject } from '../../utils/custom';

const modify = async (req: Request, res: Response) => {
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => null 값 할당
  const userInfo: IUsers = res.locals.userInfo ? res.locals.userInfo : { username: null };
  const setDTO: ISets = req.body;

  // 데이터가 누락됐을 경우
  if (checkEmptyObject(setDTO)) {
    errorGenerator({ msg: 'null body', statusCode: 400 });
  }

  // 컬렉션 id가 없을 경우
  if (!setDTO.collectionId) {
    errorGenerator({ msg: 'empty or invalid collection id', statusCode: 400 });
  }
  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  // 세트 작성 정보 세팅
  setDTO.editorId = userInfo.id;

  // 세트 생성
  const setInfo = await setServiceInstance.modifySet(setDTO);

  res.status(201).json({
    username: userInfo.username,
    ...setInfo,
  });
};
export default modify;
