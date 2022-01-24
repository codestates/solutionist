import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';

const email = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;

    const info = getRepository(users);
    const userFind = await info.findOne({ where: { email: email } });

    if (userFind) {
      return res.status(409).send('duplicate information');
    }
    return res.status(200).send('email duplicate check passed ');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};
export = email;
