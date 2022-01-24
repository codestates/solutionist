import express from 'express';
import {
  create,
  modify,
  remove,
  search,
  popular,
  select,
  record,
  solve,
  submit,
  statics,
  version,
} from '../controllers/sets/index';
import asyncfy from 'express-asyncify';
import { saveUserInfo, blockUnauthorized } from '../middleware/checkauth';

const setsRouter = asyncfy(express.Router());

setsRouter.post('/collections', saveUserInfo, create); // 세트 제작
setsRouter.post('/sets', blockUnauthorized, modify); // 세트 수정
setsRouter.delete('/collections/:collectionId', blockUnauthorized, remove); // 세트 삭제
setsRouter.get('/sets/search', search); // 세트 검색
setsRouter.get('/sets/sort', popular); // 인기 세트
setsRouter.get('/sets/:setId', select); // 세트 선택
setsRouter.post('/solve-records', saveUserInfo, record); //풀이 기록
setsRouter.post('/solve-status', solve); // 문제 풀기
setsRouter.patch('/solve-records/:recordId', submit); // 세트 제출
setsRouter.get('/solve-records/:recordId', statics); // 세트 통계
setsRouter.get('/sets/collections/:collectionId', version); // 버전 리스트

export default setsRouter;
