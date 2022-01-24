import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';
import aws from 'aws-sdk';

const image = async (req: Request, res: Response) => {
  const { email } = res.locals.userInfo;

  interface MulterRequest extends Request {
    file: any;
  }
  console.log(111);
  try {
    const image = (req as MulterRequest).file.location;
    if (image === undefined) {
      return res.status(400).send('not exists image');
    }
    const info = getRepository(users);
    const findUser = await info.findOne({ where: { email: email } });
    const s3 = new aws.S3({
      accessKeyId: process.env.BUCKET_KEY_ID,
      secretAccessKey: process.env.BUCKET_SECRET_KEY,
      region: process.env.BUCKET_REGION,
    });

    if (findUser.profileImage !== null) {
      console.log(222, findUser);
      const s3ImageName = findUser.profileImage.substring(
        findUser.profileImage.lastIndexOf('/') + 1
      );
      s3.deleteObject(
        {
          Bucket: 'solutionist',
          Key: `${s3ImageName}`,
        },
        function (err, data) {
          if (err) console.log(555, err, err.stack);
          else console.log();
        }
      );
    }

    console.log(333);
    await getConnection()
      .createQueryBuilder()
      .update(users)
      .set({ profileImage: image })
      .where('id = :id', { id: findUser.id })
      .execute();

    console.log(555, image);
    return res
      .status(200)
      .json({ data: image, message: 'successfully profile image changed' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default image;
