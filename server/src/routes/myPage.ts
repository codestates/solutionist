import express from 'express';
// import image from '../controllers/myPage/profileImage';
// import modifyUsername from '../controllers/myPage/username';
// import modifyPassword from '../controllers/myPage/password';
// import { upload } from '../middleware/multer';
import { blockUnauthorized } from '../middleware/checkauth';
import collections from '../controllers/myPage/collections';
import solveRecords from '../controllers/myPage/solved';

const myPage = express.Router();
// myPage.patch('/profileimage', blockUnauthorized, upload.single('image'), image);
// myPage.patch('/username', blockUnauthorized, modifyUsername);
// myPage.patch('/password', blockUnauthorized, modifyPassword);
myPage.get('/collections', blockUnauthorized, collections);
myPage.get('/solve-records', blockUnauthorized, solveRecords);

export default myPage;
