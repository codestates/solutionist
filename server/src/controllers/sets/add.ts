import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { ISetsDTO } from '../../interface/ISets';
import { SetService } from '../../service/sets';
import jwtToken from '../tokenFunctions';

const add = async (req: Request, res: Response) => {
  const { id, username } = res.locals.userInfo;
  const setDTO: ISetsDTO = req.body;

  // 누락된 데이터가 있을 경우
  if (!setDTO) {
    errorGenerator({ statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  // 세트 id가 있을 때 => 문제 수정
  if (setDTO.id) {
    // 기존 세트 삭제
    await setServiceInstance.setRemover(setDTO.id);
  }

  // 세트 작성
  const setInfo = await setServiceInstance.setMaker(id, setDTO); // id => userId

  res.status(200).json({
    username,
    ...setInfo,
  });
};
export default add;
