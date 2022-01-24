const axios = require('axios');

// * [GET: /sets/title?{검색어} [세트 검색]]
export function searchSets(keyword) {
  if (keyword) {
    return axios.get(`${process.env.SERVER_URL}sets/search?title=${keyword}`);
  }
}

// * GET: /sets/sort?solved-user-number [인기 세트]
export function popularSets() {
  return axios.get(`${process.env.SERVER_URL}sets/sort?solved-user-number`);
}

// * [DELETE: /collections/{collectionId} [세트 삭제]]
// TODO : TEST
export function deleteSets(collectionId) {
  return axios.delete(
    `${process.env.SERVER_URL}collections/${collectionId}`,
    // {
    // collectionId: state.collectionId,
    // },
    {
      headers: {
        'Content-Type': `application/json`,
      },
      withCredentials: true,
    }
  );
}

// * [GET: /collections [내가 만든 세트]]
// TODO : req?, 쿠키 확인?
export function getMySetsMade() {
  return axios.get(`${process.env.SERVER_URL}collections`, {
    headers: {
      'Content-Type': `application/json`,
    },
    withCredentials: true,
  });
}

// * [GET: /solveRecords [내가 푼 세트]]
// TODO : req?, 쿠키 확인?
export function getMySetsSolved() {
  return axios.get(`${process.env.SERVER_URL}solve-records`, {
    headers: {
      'Content-Type': `application/json`,
    },
    withCredentials: true,
  });
}

// // * [GET: /sets/{setId} [세트 선택]] : 세트 선택의 용도? 세트 정보 받기?
// export function selectSets(state) {
//   return axios.get(
//     `${process.env.SERVER_URL}sets/select/${state.setId}`,
//     {
//       setId: state.setId,
//     }
//   );
// }
