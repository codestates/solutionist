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
    bucket: 'sloutionist-bucket',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
    },
  }),
});
