import express from 'express';
import signup from '../controllers/users/signup';
import { login, kakaoOauth, googleOauth } from '../controllers/users/login';
import { blockUnauthorized } from '../middleware/checkauth';
import signout from '../controllers/users/signout';
import logout from '../controllers/users/logout';
import email from '../controllers/users/email';
import { upload } from '../middleware/multer';
import image from '../controllers/myPage/profileImage';
import modifyUsername from '../controllers/myPage/username';
import modifyPassword from '../controllers/myPage/password';

const userRouter = express.Router();
userRouter.delete('/signout', blockUnauthorized, signout);
userRouter.get('/email/:email', email);
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/google', googleOauth);
userRouter.post('/logout', blockUnauthorized, logout);
userRouter.post('/kakao', kakaoOauth);
userRouter.patch('/profileimage', blockUnauthorized, upload.single('image'), image);
userRouter.patch('/username', blockUnauthorized, modifyUsername);
userRouter.patch('/password', blockUnauthorized, modifyPassword);

export default userRouter;
