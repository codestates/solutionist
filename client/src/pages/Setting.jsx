import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { device } from '../styles/Breakpoints';
import { MdEdit, MdCheck } from 'react-icons/md';
import {
  signOut,
  changeProfileImage,
  changeUsername,
  changePassword,
} from '../api/SettingAPI';
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction, updateUserInfoAction } from '../modules/loginModal';

const MainContainer = styled.div`
  /* position: relative; */
  /* height: calc(100% - 190px); */
  padding: 2rem 0;
  overflow: scroll;
`;

const SettingContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 50% 1fr;
  grid-template-areas:
    '. one .'
    '. two .'
    '. three .'
    '. four .'
    '. five. ';

  div:first-child {
    grid-area: one;
  }

  div:nth-child(2) {
    grid-area: two;
  }

  div:nth-child(3) {
    grid-area: three;
  }

  div:nth-child(4) {
    grid-area: four;
  }

  div:nth-child(5) {
    grid-area: five;
  }

  div:nth-child(6) {
    grid-area: six;
  }

  @media all and (max-width: 1023px) {
    grid-template-columns: 1fr 60% 1fr;
  }
  @media all and (max-width: 767px) {
    grid-template-columns: 1rem 1fr 1rem;
    margin-top: 0px;
  }
`;

const Title = styled.div`
  align-self: flex-end;
  font-family: Noto Sans KR;
  font-weight: bold;
  user-select: none;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const LeftSide = styled.div`
  width: 80px;
  display: flex;
  flex: none;
  justify-content: flex-start;
  font-family: Noto Sans KR;
  font-size: 1.2rem;
  margin-left: 5px;
  user-select: none;

  @media all and (max-width: 1023px) {
    width: 80px;
  }
  @media all and (max-width: 767px) {
    width: 72px;
  }
`;

const Blank = styled.div`
  width: 100%;
  margin: 20px 0;
  border-bottom: 0.5px solid var(--warm-grey);
  height: 2px;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;

const EditContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin-left: 15px;
  > p {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    font-family: Noto Sans KR;
    @media all and (max-width: 767px) {
      font-size: 0.6rem;
    }
  }
  > span {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-family: Noto Sans KR;
    cursor: default;

    @media all and (max-width: 767px) {
      margin-top: 0.3rem;
    }
  }
`;

const Nickname = styled.div`
  display: flex;

  > span {
    font-family: Noto Sans KR;
    font-size: 1.2rem;
    cursor: default;

    @media all and (max-width: 767px) {
      font-size: 1rem;
    }
  }
  > svg {
    margin-top: 0.2rem;
    margin-left: 5px;
    font-size: 1rem;
    cursor: pointer;
    :hover {
      color: var(--orangey-yellow);
    }

    @media all and (max-width: 767px) {
      margin-top: 0.1rem;
    }
  }
  > input {
    width: 170px;

    @media all and (max-width: 767px) {
      width: 141px;
    }
  }

  /* 말풍선 적절한 top 과 margin-left 로 위치조정 */
  .arrow_box {
    display: none;
    position: absolute;

    width: 150px;
    padding: 10px;
    /* left: -90px; */
    /* top: -40px; */
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: var(--black);
    color: var(--butterscotch);
    font-size: 1rem;
    text-align: center;
  }

  /* .arrow_box:after {
    position: relative;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #666;
    border-width: 10px;
    pointer-events: none;
    content: ' ';
  } */

  svg:hover + p.arrow_box {
    display: block;
    position: relative;
    left: -90px;
    top: -40px;
  }
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  background-color: var(--warm-grey);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;

  @media all and (max-width: 1023px) {
    margin-left: 30px;
  }
  @media all and (max-width: 767px) {
    margin-left: 18px;
  }

  input {
    width: 80px;
    height: 80px;
    outline: none;
    display: block;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    margin: 0;
    z-index: -1;
  }

  label {
    position: inherit;
    width: 80px;
    height: 80px;
    outline: none;
    display: block;
    border-radius: 50%;
    cursor: pointer;
  }

  img {
    position: inherit;
    width: 80px;
    height: 80px;
    outline: none;
    display: block;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  font-family: Noto Sans KR;
  font-size: 1rem;
  border-bottom: 1px solid var(--light--gray);
  ::placeholder {
    font-family: Noto Sans KR;
  }

  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

const PasswordContainer = styled.div`
  display: grid;
  font-family: Noto Sans KR;
  grid-template-rows: 3fr;
  grid-template-columns: 20px 1fr;
  grid-gap: 18px 15px;
  grid-template-areas:
    '. one'
    '. two'
    '. three'
    '. four'
    '. five';

  @media all and (max-width: 1023px) {
    margin-left: -5px;
  }
  @media all and (max-width: 767px) {
    margin-left: -15px;
    grid-gap: 14px 15px;
  }

  input:first-child {
    grid-area: one;
    width: 260px;
    -webkit-text-security: disc;

    @media all and (max-width: 767px) {
      width: 235px;
    }
  }

  input:nth-child(2) {
    grid-area: two;
    width: 260px;
    -webkit-text-security: disc;

    @media all and (max-width: 767px) {
      width: 235px;
    }
  }

  input:nth-child(3) {
    grid-area: three;
    width: 260px;
    -webkit-text-security: disc;

    @media all and (max-width: 767px) {
      width: 235px;
    }
  }

  p:nth-child(4) {
    margin-top: -10px;
    font-size: 0.8rem;
    line-height: 0.9rem;
    font-family: Noto Sans KR;
    grid-area: four;
    white-space: pre-wrap;

    @media all and (max-width: 767px) {
      font-size: 0.6rem;
    }
  }

  button:nth-child(5) {
    grid-area: five;
    margin-top: -8px;
  }
`;

const AccountManagementContainer = styled.div`
  display: grid;
  font-family: Noto Sans KR;
  grid-template-rows: 3fr;
  grid-template-columns: 20px 1fr;
  grid-gap: 18px 15px;
  grid-template-areas: '. one';

  @media all and (max-width: 1023px) {
    margin-left: -5px;
  }
  @media all and (max-width: 767px) {
    margin-left: -15px;
  }

  button:first-child {
    margin-top: -8px;
    grid-area: one;
  }
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  box-shadow: 0 0 0 2px inset black;
  margin-left: -5px;
  width: fit-content;
  height: fit-content;

  /* 색상 & 폰트 */
  background-color: var(--butterscotch);
  cursor: pointer;
  font-family: Noto Sans KR;
  font-size: 1rem;
  font-weight: bold;
  color: var(--black);

  &:hover {
    background-color: black;
    color: var(--butterscotch);
  }
  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const Setting = () => {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.loginModal.userInfo,
  }));
  const { username, email, profileImage, type } = userInfo;

  // console.log(type);

  // * 회원 탈퇴
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutAction = () => dispatch(logoutAction());
  const onUpdateUserInfoAction = (data) => dispatch(updateUserInfoAction(data));

  const handleSignOut = () => {
    signOut()
      .then(() => {
        console.log('회원 탈퇴 성공');
        onLogoutAction();
        navigate('/');
      })
      .catch((err) => {
        console.log('signout API 에러', err);
      });
  };

  // * 프로필 사진 변경
  const imgRef = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log(file);

    // ! file을 서버에 보내기
    const sendAPICall = async () => {
      try {
        const data = await changeProfileImage(file);
        const updateUserInfo = {
          username: username,
          email: email,
          profileImage: data.data.data,
          type: type,
        };
        onUpdateUserInfoAction(updateUserInfo);
        // TODO : data(res)의 image를 userinfo state(리덕스)에 반영하기
      } catch (err) {
        console.log('changeProfileImage err:', err);
      }
    };
    sendAPICall();
  };

  // * username 변경
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  const [isAfterUsernameEdit, setIsAfterUsernameEdit] = useState(false);
  const [afterValiNameMsg, setAfterValiNameMsg] = useState('');

  const [changeInfo, setChangeInfo] = useState({
    newUsername: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const handleEditUsername = () => {
    setIsUsernameEdit(true);
    setIsAfterUsernameEdit(false);
    setValiNameMsg('');
  };

  console.log(userInfo);
  const handleSubmitNewUsername = () => {
    changeUsername(changeInfo.newUsername)
      .then((res) => {
        const updateUserInfo = {
          username: res.data.data.username,
          email: email,
          profileImage: profileImage,
          type: type,
        };
        onUpdateUserInfoAction(updateUserInfo);
        setIsAfterUsernameEdit(true);
        setAfterValiNameMsg('닉네임 변경이 완료되었습니다!');
      })
      .catch((err) => {
        const errCode = err.response.status || 500;
        if (errCode === 409) {
          setAfterValiNameMsg('변경 전과 같은 닉네임입니다.');
        } else {
          setAfterValiNameMsg('변경을 실패했습니다!');
        }
        console.log('changeUsername 에러캐치', err);
      });
    setIsUsernameEdit(false);
  };

  // * 비밀번호 변경
  const handleSubmitNewPassword = () => {
    changePassword(changeInfo.password, changeInfo.newPassword)
      .then((res) => {
        console.log('changePassword 요청 성공, res:', res);
        setValiPwMsg('비밀번호 변경이 완료되었습니다! :)');
      })
      .catch((err) => {
        const errCode = err.response.status || 500;
        if (errCode === 400) {
          setValiPwMsg('변경 전 비밀번호를 잘못 입력했습니다.');
        } else if (errCode === 409) {
          setValiPwMsg('비밀번호 변경을 실패했습니다!');
          // TODO : 현재 비밀번호 불일치 에러코드 반영
        }
        console.log('changePassword 에러캐치', err);
      });
  };

  // * 유효성 검사
  const [valiInfo, setValiInfo] = useState({
    isNewUsername: false,
    isPassword: false,
    isNewPassword: false,
    isNewPasswordConfirm: false,
  });

  const [isNotDupliPw, setIsNotDupliPw] = useState(false);

  const { isNewUsername, isPassword, isNewPassword, isNewPasswordConfirm } = valiInfo;

  const [valiNameMsg, setValiNameMsg] = useState('');
  const [valiPwMsg, setValiPwMsg] = useState('');

  console.log(changeInfo, valiInfo, isNotDupliPw);

  // newUsername 유효성 검사
  const handleChangeNewUsername = useCallback(
    (e) => {
      setChangeInfo({ ...changeInfo, newUsername: e.target.value });
      if (e.target.value.length < 3 || e.target.value.length > 10) {
        setValiNameMsg('3글자 이상 10글자 이하로 입력해주세요!');
        setValiInfo({ ...valiInfo, isNewUsername: false });
      } else {
        setValiNameMsg('올바른 이름 형식입니다 :)');
        setValiInfo({ ...valiInfo, isNewUsername: true });
      }
    },
    [changeInfo]
  );

  // password 유효성 검사
  const handleChangePassword = useCallback(
    (e) => {
      setChangeInfo({ ...changeInfo, password: e.target.value });
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      if (!passwordRegex.test(passwordCurrent)) {
        setValiPwMsg(`현재 비밀번호를 입력해주세요!`);
        setValiInfo({ ...valiInfo, isPassword: false });
      } else {
        setValiPwMsg('현재 비밀번호를 입력하셨습니다 :)');
        setValiInfo({ ...valiInfo, isPassword: true });
      }
    },
    [changeInfo]
  );

  // NewPassword 유효성 검사
  const handleChangeNewPassword = useCallback(
    (e) => {
      setChangeInfo({ ...changeInfo, newPassword: e.target.value });
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      if (!passwordRegex.test(passwordCurrent)) {
        setValiPwMsg(
          `새 비밀번호를 입력해주세요!\n숫자+영문자+특수문자로 8자리 이상 입력하세요\n사용 가능한 특수문자: !@#$%^*+=-`
        );
        setValiInfo({ ...valiInfo, isNewPassword: false });
      } else {
        setValiPwMsg('안전한 새 비밀번호예요 :)');
        setValiInfo({ ...valiInfo, isNewPassword: true });
      }
    },
    [changeInfo]
  );

  const handleCheckDupliPw = useCallback(() => {
    if (changeInfo.password === changeInfo.newPassword) {
      setValiPwMsg('현재 비밀번호와 입력하신 새 비밀번호가 같습니다.');
      setIsNotDupliPw(false);
    } else {
      setIsNotDupliPw(true);
    }
  }, [changeInfo]);

  // newPasswordConfirm 유효성 검사
  const handleChangeNewPasswordConfirm = useCallback(
    (e) => {
      setChangeInfo({ ...changeInfo, newPasswordConfirm: e.target.value });
      const passwordConfirmCurrent = e.target.value;
      if (changeInfo.newPassword === passwordConfirmCurrent) {
        setValiPwMsg('새 비밀번호를 똑같이 입력했어요 :)');
        setValiInfo({ ...valiInfo, isNewPasswordConfirm: true });
      } else {
        setValiPwMsg('새로 입력한 비밀번호가 달라요.\n다시 확인해주세요!');
        setValiInfo({ ...valiInfo, isNewPasswordConfirm: false });
      }
    },
    [changeInfo]
  );

  return (
    <MainContainer>
      <SettingContainer>
        <Title>개인정보 설정</Title>
        <Blank />
        <div>
          <EditContainer>
            <LeftSide>프로필</LeftSide>
            <ImageContainer>
              <input type="file" id="upload" onChange={handleFileInput} />
              <label htmlFor="upload">
                <img
                  src={`${profileImage}`}
                  ref={imgRef}
                  onError={() => {
                    return (imgRef.current.src =
                      'https://i.pinimg.com/236x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg');
                  }}
                />
              </label>
            </ImageContainer>
            <PersonalInfo>
              {isUsernameEdit ? (
                <>
                  <Nickname>
                    <StyledInput
                      placeholder="새 닉네임 입력"
                      onChange={handleChangeNewUsername}
                    />
                    <MdCheck
                      onClick={() =>
                        !isNewUsername
                          ? setValiNameMsg('유효하지 않은 입력입니다.')
                          : handleSubmitNewUsername()
                      }
                    />
                  </Nickname>
                  {valiNameMsg ? <p>{valiNameMsg}</p> : ''}
                </>
              ) : (
                <Nickname>
                  <span>{username}</span>
                  <MdEdit onClick={handleEditUsername} />
                  {/* <p className="arrow_box">닉네임을 바꿔보세요!</p> */}
                </Nickname>
              )}
              {isAfterUsernameEdit ? (
                <p style={{ color: 'black' }}>{afterValiNameMsg}</p>
              ) : (
                ''
              )}
              <span>{email}</span>
            </PersonalInfo>
          </EditContainer>
          <Blank />
        </div>
        {type === 'google' || type === 'kakao' ? (
          ''
        ) : (
          <div>
            <EditContainer>
              <LeftSide>비밀번호</LeftSide>
              <PasswordContainer>
                <StyledInput
                  type="currpassword"
                  placeholder="현재 비밀번호"
                  onChange={handleChangePassword}
                />
                <StyledInput
                  onBlur={handleCheckDupliPw}
                  type="newpassword"
                  placeholder="새 비밀번호"
                  onChange={handleChangeNewPassword}
                />
                <StyledInput
                  type="confirmpassword"
                  placeholder="새 비밀번호 확인"
                  onChange={handleChangeNewPasswordConfirm}
                />
                <p>{valiPwMsg}</p>
                <StyledButton
                  onClick={() =>
                    !(isPassword && isNewPassword && isNewPasswordConfirm && isNotDupliPw)
                      ? setValiPwMsg('채우지 않았거나 유효하지 않은 입력이 있어요.')
                      : handleSubmitNewPassword()
                  }
                >
                  비밀번호 변경
                </StyledButton>
              </PasswordContainer>
            </EditContainer>
            <Blank />
          </div>
        )}
        <div>
          <EditContainer>
            <LeftSide>계정관리</LeftSide>
            <AccountManagementContainer>
              <StyledButton onClick={handleSignOut}>회원 탈퇴</StyledButton>
            </AccountManagementContainer>
          </EditContainer>
        </div>
      </SettingContainer>
    </MainContainer>
  );
};

export default Setting;
