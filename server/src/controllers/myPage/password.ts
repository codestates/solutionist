import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import cryptos from '../../utils/crypto';

const modifyPassword = async (req: Request, res: Response) => {
  try {
    console.log('hello');
    const { email } = res.locals.userInfo;

    const info = getRepository(users);
    const findUser = await info.findOne({ where: { email: email } });

    const { newPassword, password } = req.body;

    console.log(password, newPassword);

    // const saltBase = findUser.salt;
    // const salt = Buffer.from(saltBase, 'base64');
    // const dbpw = cryptos.encrypt(password, salt);
    // const dbnewpw = cryptos.encrypt(newPassword, salt);

    const salt = findUser.password;
    const dbpw = await bcrypt.compare(password, salt);
    const newDbPw = await bcrypt.hash(newPassword, 10);
    const checkPw = await bcrypt.compare(newPassword, salt);

    if (!dbpw) {
      console.log('?');
      return res.status(400).send('wrong password');
    }

    if (checkPw) {
      console.log('??');
      return res.status(409).send('duplicate information');
    }

    console.log('good');
    await getConnection()
      .createQueryBuilder()
      .update(users)
      .set({ password: newDbPw })
      .where('id = :id', { id: findUser.id })
      .execute();

    return res.status(201).send('successfully password changed');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default modifyPassword;
