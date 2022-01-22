import { Request, Response } from 'express';
import cryptos from '../../utils/crypto';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import jwtToken from '../../utils/tokenFunctions/index';
import bcrypt from 'bcrypt';
import axios from 'axios';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send('ok');
    }

    const info = getRepository(users);
    const user = await info.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).send('Email not found');
    }

    console.log(333, user);
    // const saltBase = user.salt;
    // const salt = Buffer.from(saltBase, 'base64');
    // const dbpw = cryptos.encrypt(password, salt);

    const salt = user.password;

    // async/await 사용
    const dbpw = await bcrypt.compare(password, salt);

    console.log(333, dbpw);
    if (dbpw === false) {
      return res.status(401).send('password mismatch');
    }

    delete user.password;
    // delete user.salt;
    const userInfo = JSON.stringify(user);
    const accessToken = jwtToken.accessToken(userInfo);
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      type: user.type,
    };
    jwtToken.sendAccessToken(res, accessToken);
    console.log(111, accessToken);
    return res.status(200).json({ data: { payload }, message: 'ok' });
  } catch (err) {
    console.log(res.status);
    return res.status(500).send('internal server error');
    // return res.status(500).send('internal server error');
  }
};

const kakaoOauth = async (req: Request, res: Response) => {
  const { authorizationCode } = req.body;
  try {
    const resToken = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
        code: authorizationCode,
        redirect_uri: process.env.CLIENT_URI,
      },
    });
    const { access_token: accessToken } = resToken.data;
    const kakaoUserInfo = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { nickname: username, profile_image: profileImage } =
      kakaoUserInfo.data.properties;
    const { email } = kakaoUserInfo.data.kakao_account;

    const findUser = async () => {
      try {
        const info = getRepository(users);
        const user = await info.findOne({ where: { email: email } });
        return user;
      } catch (err) {
        console.log(err);
        return err;
      }
    };

    const dbUser = await findUser();
    console.log(111, dbUser);

    if (!dbUser) {
      const user = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(users)
        .values([
          {
            username: username,
            email: email,
            type: 'kakao',
            profileImage: profileImage,
          },
        ])

        .execute();
    }
    const secondFind = await findUser();
    const payload = {
      id: secondFind.id,
      username: secondFind.username,
      email: secondFind.email,
      type: secondFind.type,
      profileImage: secondFind.profileImage,
    };
    const userString = JSON.stringify(payload);
    const accessToken2 = jwtToken.accessToken(userString);
    jwtToken.sendAccessToken(res, accessToken2);
    console.log('accessToken', accessToken2);
    return res.status(201).json({ data: payload });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};
const googleOauth = async (req: Request, res: Response) => {
  const { authorizationCode } = req.body;
  const decode = decodeURIComponent(authorizationCode);

  try {
    const resToken = await axios({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: decode,
        redirect_uri: process.env.CLIENT_URI,
      },
    });

    const { access_token: accessToken } = resToken.data;
    const userInfo = await axios({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { name: username, email, picture: profileImage } = userInfo.data;

    const findUser = async () => {
      try {
        const info = getRepository(users);
        const user = await info.findOne({ where: { email: email } });
        return user;
      } catch (err) {
        console.log(err);
        return err;
      }
    };

    const dbUser = await findUser();

    if (!dbUser) {
      const user = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(users)
        .values([
          {
            username: username,
            email: email,
            type: 'google',
            profileImage: profileImage,
          },
        ])
        .execute();
    }

    const secondFind = await findUser();
    const payload = {
      id: secondFind.id,
      username: secondFind.username,
      email: secondFind.email,
      type: secondFind.type,
      profileImage: secondFind.profileImage,
    };
    const userString = JSON.stringify(payload);
    const accessToken2 = jwtToken.accessToken(userString);
    jwtToken.sendAccessToken(res, accessToken2);
    console.log('accessToken', accessToken2);
    return res.status(201).json({ data: payload });

    console.log(resToken);
  } catch (err) {
    console.log('err :', err);
    return res.status(500).send('Internal Server Error');
  }
};
export { login, kakaoOauth, googleOauth };

// import { Request, Response } from 'express';
// import { users } from '../../database/entity/users';
// import { getRepository, getConnection } from 'typeorm';
// import 'dotenv/config';
// import axios from 'axios';
// import jwtToken from '../../utils/tokenFunctions/index';

// const googleOauth = async (req: Request, res: Response) => {
//   const googletokenURL = 'https://oauth2.googleapis.com/token';
//   const googleInfoURL = 'https://www.googleapis.com/oauth2/v2/userinfo';

//   const googleClientId = process.env.GOOGLE_CLIENT_ID;
//   const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

//   try {
//     const tokenRes = await axios.post(
//       `https://oauth2.googleapis.com/token?code=${req.body.authorizationCode}&client_id=${googleClientId}&client_secret=${googleClientSecret}&redirect_uri=${process.env.CLIENT_URI}&grant_type=authorization_code`
//     );

//     const { access_token: accessToken } = tokenRes.data;
//     const userInfo = await axios.get(googleInfoURL, {
//       headers: {
//         authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const { name: username, email, picture: profileImage } = userInfo.data;
//     const info = getRepository(users);
//     const findUser = await info.findOne({ where: { email: email } });

//     if (!findUser) {
//       const user = await getConnection()
//         .createQueryBuilder()
//         .insert()
//         .into(users)
//         .values([{ username: username, email: email, type: 'google', profileImage }])
//         .execute();

//       const secondFind = await info.findOne({ where: { email: email } });
//       const payload = {
//         id: secondFind.id,
//         username: secondFind.username,
//         email: secondFind.email,
//         type: secondFind.type,
//         role: secondFind.role,
//       };
//       const userString = JSON.stringify(payload);
//       const accessToken = jwtToken.accessToken(userString);
//       jwtToken.sendAccessToken(res, accessToken);
//       console.log('accessToken', accessToken);
//       return res.status(201).json({ data: payload });
//     } else {
//       const payload = {
//         id: findUser.id,
//         username: findUser.username,
//         email: findUser.email,
//         type: findUser.type,
//         role: findUser.role,
//       };
//       const userString = JSON.stringify(payload);
//       const accessToken = jwtToken.accessToken(userString);
//       jwtToken.sendAccessToken(res, accessToken);
//       console.log('accessToken', accessToken);
//       return res.status(201).json({ data: payload });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send('Internal Server Error');
//   }
// };

// export default googleOauth;
