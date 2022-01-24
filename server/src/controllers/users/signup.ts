import { Request, Response } from 'express';
import cryptos from '../../utils/crypto';
import { users } from '../../database/entity/users';
import { getConnection } from 'typeorm';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(422).send('successfully signed in');
    }

    console.log(username, email, password);

    const salt = 10;

    // async/await 사용
    const dbpw = await bcrypt.hash(password, salt);

    console.log(dbpw);
    const user = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(users)
      .values([{ username: username, email: email, password: dbpw }])
      .execute();
    return res.status(200).send('successfully signed in');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default signup;
