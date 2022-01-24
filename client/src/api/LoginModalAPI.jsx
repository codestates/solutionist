const axios = require('axios');

export function postLogin(state) {
  return axios.post(
    `${process.env.SERVER_URL}users/login`,
    {
      email: state.email,
      password: state.password,
    },
    {
      headers: {
        'Content-Type': `application/json`,
      },
      withCredentials: true,
    }
  );
}

export function signUp(state) {
  return axios.post(`${process.env.SERVER_URL}users/signup`, {
    username: state.username,
    email: state.email,
    password: state.password,
  });
}

export function dupliEmail(state) {
  return axios.get(`${process.env.SERVER_URL}users/email/${state.email}`, {
    email: state.email,
  });
}

export function signUpGoogle(authorizationCode) {
  return axios.post(
    `${process.env.SERVER_URL}users/google`,
    {
      authorizationCode,
    },
    {
      headers: {
        'Content-Type': `application/json`,
      },
      withCredentials: true,
    }
  );
}

export function signUpKakao(authorizationCode) {
  return axios.post(
    `${process.env.SERVER_URL}users/kakao`,
    {
      authorizationCode,
    },
    {
      headers: {
        'Content-Type': `application/json`,
      },
      withCredentials: true,
    }
  );
}
