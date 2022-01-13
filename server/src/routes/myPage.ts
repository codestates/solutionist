import express from 'express';
import image from '../controllers/myPage/profileImage';
import modifyUsername from '../controllers/myPage/username';
import { blockUnauthorized } from '../middleware/checkauth';
import { upload } from '../middleware/multer';
import modifyPassword from '../controllers/myPage/password';
import made from '../controllers/myPage/collections';

const myPage = express.Router();
myPage.patch('/profileImage', blockUnauthorized, upload.single('image'), image);
myPage.patch('/username', blockUnauthorized, modifyUsername);
myPage.patch('/password', blockUnauthorized, modifyPassword);
myPage.get('/collections', blockUnauthorized, made);

export default myPage;
