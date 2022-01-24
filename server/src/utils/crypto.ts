// ================양방향 키 사용 안함================

import crypto from 'crypto';
import 'dotenv/config';

const algorithm = 'aes-256-ctr';
const secretKey: string = process.env['SECRET_KEY'] as string;

const cryptos = {
  encrypt: (text, iv) => {
    console.log('secretKey', secretKey);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex');
  },

  decrypt: (hash, iv) => {
    console.log('secretKey', secretKey);
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash, 'hex')),
      decipher.final(),
    ]);

    return decrpyted.toString();
  },
};

export default cryptos;
