const axios = require('axios');

export function changeProfileImage(file) {
  // console.log('axios:', file);
  if (file) {
    const formData = new FormData();
    formData.append('image', file);
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    return axios
      .patch(`${process.env.SERVER_URL}users/profileimage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log('changeProfileImage 요청 성공, res:', res);
        return res;
      });
  }
}

export function changeUsername(newUsername) {
  console.log(newUsername);
  return axios.patch(
    `${process.env.SERVER_URL}users/username`,
    { newUsername },
    {
      headers: {
        'Content-Type': `application/json`,
      },
      withCredentials: true,
    }
  );
}

export function changePassword(password, newPassword) {
  // console.log(password, newPassword);
  return axios.patch(
    `${process.env.SERVER_URL}users/password`,
    { password, newPassword },
    {
      headers: {
        'Content-Type': `application/json`,
      },
      withCredentials: true,
    }
  );
}

export function signOut() {
  return axios.delete(`${process.env.SERVER_URL}users/signout`, {
    headers: {
      'Content-Type': `application/json`,
    },
    withCredentials: true,
  });
}

export function logout() {
  return axios.post(
    `${process.env.SERVER_URL}users/logout`,
    {},
    {
      headers: {
        'Content-Type': `application/json`,
      },
      withCredentials: true,
    }
  );
}
