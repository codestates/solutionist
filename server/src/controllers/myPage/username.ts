import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';

const modifyUsername = async (req: Request, res: Response) => {
  try {
    const { id, username, email, type, profileImage } = res.locals.userInfo;

    const { newUsername } = req.body;

    console.log(newUsername);
    if (newUsername === username) {
      return res.status(409).send('duplicate information');
    }
    await getConnection()
      .createQueryBuilder()
      .update(users)
      .set({ username: newUsername })
      .where('id = :id', { id: id })
      .execute();

    const playload = {
      username: newUsername,
      profileImage: profileImage,
    };

    return res
      .status(201)
      .json({ data: playload, message: 'successfully user name changed' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default modifyUsername;
