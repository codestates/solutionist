import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import 'dotenv/config';

const s3 = new aws.S3({
  accessKeyId: process.env.BUCKET_KEY_ID,
  secretAccessKey: process.env.BUCKET_SECRET_KEY,
  region: process.env.BUCKET_REGION,
});
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'solutionist',
    acl: 'public-read',
    key: function (req, file, cb) {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${Date.now()}.${extension}`);
    },
  }),
});
