import 'dotenv/config';
import { access } from 'fs';
import { sign, verify, Secret } from 'jsonwebtoken';

const jwtToken = {
  accessToken: (data: any) => {
    const period: string = process.env.EXPIRATION_PERIOD
      ? process.env.EXPIRATION_PERIOD
      : '1h';
    return sign({ data: data }, process.env.ACCESS_SECRET, { expiresIn: period });
  },
  isAuthorized: (data: any) => {
    if (!data) {
      return null;
    }
    try {
      const token = data;
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      // return null if invalid token
      return null;
    }
  },
  sendAccessToken: (res, accessToken: any) => {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: true,
      domain: process.env.DOMAIN,
      maxAge: 1000 * 60 * 60,
    });
  },
};

export default jwtToken;
