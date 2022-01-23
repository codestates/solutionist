import React from 'react';
import '../App.css';
import styled, { keyframes } from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FaTimesCircle } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import { device } from '../styles/Breakpoints';
import { useNavigate } from 'react-router-dom';
import {
  postLogin,
  signUp,
  dupliEmail,
  signUpGoogle,
  signUpKakao,
} from '../api/LoginModalAPI';
import LandingLOGO from '../../public/assets/images/LandingLOGO.png';

// * 프리젠테이셔널 컴포넌트

const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 520px;
  border-radius: 10px;
  background-color: #fff;
  svg {
    cursor: pointer;
  }
`;

const FormBox = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

  p {
    white-space: pre-wrap;
    color: var(--red--error);
  }

  img {
    width: 80%;
    margin: 0 auto;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 10px;
  }
  input {
    font-size: 1.125rem;
    border-bottom: 1px solid var(--warm-grey);
  }
`;

const FlexEndGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 1.5rem; // 삭제 아이콘 크기
  span {
    font-size: 1rem;
    cursor: pointer;

    @media ${device.tablet} {
      font-size: 1rem;
    }
  }
`;

const IconBorder = styled.div`
  border-radius: 10px;
  border: solid 2px ${(props) => (props.border ? props.border : '')};
  font-size: 2rem;
  font-weight: 500;
  width: 100%;
  padding: 0.25rem 0;
  height: fit-content;
  background-color: ${(props) => (props.bg ? props.bg : '')};
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    margin-right: 10px;
  }

  span {
    font-size: 1rem;
  }
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  border: 2px solid black;

  /* 색상 & 폰트 */
  background-color: var(--butterscotch);
  font-size: 1rem;
  font-weight: 500;
  color: var(--black);

  &:hover {
    opacity: 0.75;
  }
`;

// 모달 컴포넌트
const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 1010;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  background-color: white;
  width: 320px;
  height: 520px;
  padding: 20px;
  border-radius: 10px;
`;

// keyframes 애니메이션
const boxFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledWrapper = styled.div`
  animation: ${boxFade} 1s normal;
  z-index: 1010;
  position: absolute;
`;

const LoginModal = ({
  isLoginModalOn,
  onModalOffAction,
  onloginAction,
  onUpdateUserInfoAction,
}) => {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setErrorMessage('');
    setToggle(!toggle);
  };
  const navigate = useNavigate();

  // * 로그인 기능
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (target) => (e) => {
    setLoginInfo({ ...loginInfo, [target]: e.target.value });
  };

  const handleLogin = () => {
    if (!loginInfo.email || !loginInfo.password) {
      setErrorMessage('아이디와 비밀번호를 입력해주세요!');
    } else {
      postLogin(loginInfo)
        .then((res) => {
          // TODO : res redux에 저장
          onUpdateUserInfoAction(res.data.data.payload);
          onModalOffAction();
          onloginAction();
        })
        .catch((err) => {
          const errCode = err.response.status || 500;
          if (errCode === 401) {
            setErrorMessage('유효하지 않은 유저 입니다!');
          } else {
            setErrorMessage('로그인을 실패했습니다!');
          }
          console.log('postLogin 에러캐치', err);
        });
    }
  };

  // * 회원가입 기능
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  // 회원가입 완료후 메시지 설정
  const [afterSignUp, setAfterSignUp] = useState('');

  const handleSignup = () => {
    signUp(signupInfo)
      .then(() => {
        console.log('회원가입 성공');
        handleToggle();
        setAfterSignUp('회원가입이 완료되었습니다! 로그인 하세요!');
      })
      .catch((err) => {
        const errMessage = err.response.data.message;
        if (errMessage === 'insufficient parameters supplied') {
          setErrorMessage('내용을 모두 입력해주세요!');
        } else {
          setErrorMessage('회원가입에 실패했습니다!');
        }
      });
  };

  // * 이메일 중복 검사
  // TODO : 인풋창 벗어날 때 API 요청(onBlur), 성공시 아무것도 안함, 실패시 에러메시지 빨갛게 표시
  const [isDupli, setIsDupli] = useState(false);

  const handleCheckDupliEmail = () => {
    dupliEmail(signupInfo)
      .then(() => {
        setIsDupli(false);
        console.log('중복 이메일 아님 사용 가능 ㅊㅋㅊㅋ');
      })
      .catch(() => {
        setIsDupli(true);
        setValiErrMessage({
          ...valiErrMessage,
          ErrDupliEmail: '중복된 이메일이에요. 다시 입력해주세요!',
        });
      });
  };

  // * 유효성 검사
  const [valiInfo, setValiInfo] = useState({
    isEmail: false,
    isUsername: false,
    isPassword: false,
    isPasswordConfirm: false,
  });

  const { isEmail, isUsername, isPassword, isPasswordConfirm } = valiInfo;

  const [valiErrMessage, setValiErrMessage] = useState({
    ErrEmail: '',
    ErrUsername: '',
    ErrPassword: '',
    ErrPasswordConfirm: '',
    ErrDupliEmail: '',
  });

  // 회원가입 onChange
  // 이메일
  const onChangeEmail = useCallback(
    (e) => {
      setSignupInfo({ ...signupInfo, email: e.target.value });
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      if (!emailRegex.test(emailCurrent)) {
        setValiErrMessage({
          ...valiErrMessage,
          ErrEmail: '이메일 형식이 틀렸어요! 다시 확인해주세요!',
        });
        setValiInfo({ ...valiInfo, isEmail: false });
      } else {
        setValiErrMessage({ ...valiErrMessage, ErrEmail: '올바른 이메일 형식이에요 :)' });
        setValiInfo({ ...valiInfo, isEmail: true });
      }
    },
    [signupInfo]
  );

  // 아이디
  const onChangeUsername = useCallback(
    (e) => {
      setSignupInfo({ ...signupInfo, username: e.target.value });
      if (e.target.value.length < 3 || e.target.value.length > 10) {
        setValiErrMessage({
          ...valiErrMessage,
          ErrUsername: '3글자 이상 10글자 이하로 입력해주세요!',
        });
        setValiInfo({ ...valiInfo, isUsername: false });
      } else {
        setValiErrMessage({
          ...valiErrMessage,
          ErrUsername: '올바른 이름 형식입니다 :)',
        });
        setValiInfo({ ...valiInfo, isUsername: true });
      }
    },
    [signupInfo]
  );

  // 비밀번호
  const onChangePassword = useCallback(
    (e) => {
      setSignupInfo({ ...signupInfo, password: e.target.value });
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      if (!passwordRegex.test(passwordCurrent)) {
        setValiErrMessage({
          ...valiErrMessage,
          ErrPassword: `비밀번호를 입력해주세요!\n숫자+영문자+특수문자로 8자리 이상 입력하세요\n사용 가능한 특수문자: !@#$%^*+=-`,
        });
        setValiInfo({ ...valiInfo, isPassword: false });
      } else {
        setValiErrMessage({
          ...valiErrMessage,
          ErrPassword: '안전한 비밀번호예요 :)',
        });
        setValiInfo({ ...valiInfo, isPassword: true });
      }
    },
    [signupInfo]
  );

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      setSignupInfo({ ...signupInfo, passwordConfirm: e.target.value });
      const passwordConfirmCurrent = e.target.value;
      if (signupInfo.password === passwordConfirmCurrent) {
        setValiErrMessage({
          ...valiErrMessage,
          ErrPasswordConfirm: '비밀번호를 똑같이 입력했어요 :)',
        });
        setValiInfo({ ...valiInfo, isPasswordConfirm: true });
      } else {
        setValiErrMessage({
          ...valiErrMessage,
          ErrPasswordConfirm: '비밀번호가 달라요.\n다시 확인해주세요!',
        });
        setValiInfo({ ...valiInfo, isPasswordConfirm: false });
      }
    },
    [signupInfo]
  );

  // * 구글 Oauth
  const handleSignGoogle = () => {
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&state=google`
    );
  };

  // * 카카오 Oauth
  const handleSignKakao = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&state=kakao`
    );
  };

  // * 카카오 Oauth 리디렉션 코드 post로 보내기
  let authorizationCode;
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.href.split('=')[0].split('/')[3] === '?code') {
      // 카카오
      authorizationCode = url.href.split('=')[1] || undefined;
      if (authorizationCode) {
        authorizationCode = authorizationCode.split('&')[0] + '&';
        console.log(authorizationCode);
        onModalOffAction();
        signUpKakao(authorizationCode)
          .then((res) => {
            onUpdateUserInfoAction(res.data.data);
            console.log('카카오 로그인 성공');
          })
          .then(() => {
            onloginAction();
            navigate('/');
          });
      }
    } else {
      // 구글
      authorizationCode = url.href.split('=')[2] || undefined;
      if (authorizationCode) {
        authorizationCode = authorizationCode.split('&')[0] + '&';
        console.log(authorizationCode);
        onModalOffAction();
        signUpGoogle(authorizationCode)
          .then((res) => {
            onUpdateUserInfoAction(res.data.data);
            console.log('구글 로그인 성공');
          })
          .then(() => {
            onloginAction();
            navigate('/');
          });
      }
    }
  }, [authorizationCode]);

  return (
    <>
      {isLoginModalOn ? (
        <StyledWrapper>
          <ModalBackdrop onClick={onModalOffAction}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              {toggle ? (
                <ModalContainer onSubmit={(e) => e.preventDefault()}>
                  <FormBox>
                    <FlexEndGroup>
                      <FaTimesCircle onClick={onModalOffAction} />
                    </FlexEndGroup>
                    <img src={LandingLOGO} />
                    <InputBox>
                      <label>이메일</label>
                      <input
                        onChange={handleInputValue(Object.keys(loginInfo)[0])}
                        placeholder="이메일을 입력해주세요."
                      ></input>
                    </InputBox>
                    <InputBox>
                      <label>비밀번호</label>
                      <input
                        onChange={handleInputValue(Object.keys(loginInfo)[1])}
                        type={'password'}
                        placeholder="비밀번호를 입력해주세요."
                      ></input>
                    </InputBox>
                    {errorMessage ? <p>{errorMessage}</p> : ''}
                    {afterSignUp ? (
                      <span style={{ color: 'black' }}>{afterSignUp}</span>
                    ) : (
                      ''
                    )}
                    <StyledButton onClick={handleLogin}>로그인</StyledButton>
                    <IconBorder onClick={handleSignGoogle} border={'#4384f3'}>
                      <div>
                        <FcGoogle />
                        <span>구글 로그인</span>
                      </div>
                    </IconBorder>
                    <IconBorder onClick={handleSignKakao} bg={'#f7e600'} border={'black'}>
                      <div>
                        <RiKakaoTalkFill />
                        <span>카카오 로그인</span>
                      </div>
                    </IconBorder>
                    <FlexEndGroup onClick={handleToggle}>
                      <span>아직 계정이 없으신가요?</span>
                    </FlexEndGroup>
                  </FormBox>
                </ModalContainer>
              ) : (
                <ModalContainer onSubmit={(e) => e.preventDefault()}>
                  <FormBox>
                    <FlexEndGroup>
                      <FaTimesCircle onClick={onModalOffAction} />
                    </FlexEndGroup>
                    <InputBox>
                      <label>이메일</label>
                      <input
                        onBlur={handleCheckDupliEmail}
                        onChange={onChangeEmail}
                        placeholder="이메일을 입력해주세요."
                      ></input>
                    </InputBox>
                    {valiErrMessage.ErrEmail ? (
                      isDupli ? (
                        <p>{valiErrMessage.ErrDupliEmail}</p>
                      ) : valiInfo.isEmail ? (
                        <p style={{ color: 'black' }}>{valiErrMessage.ErrEmail}</p>
                      ) : (
                        <p>{valiErrMessage.ErrEmail}</p>
                      )
                    ) : (
                      ''
                    )}
                    <InputBox>
                      <label>닉네임</label>
                      <input
                        onChange={onChangeUsername}
                        placeholder="닉네임을 입력해주세요."
                      ></input>
                    </InputBox>
                    {valiErrMessage.ErrUsername ? (
                      valiInfo.isUsername ? (
                        <p style={{ color: 'black' }}>{valiErrMessage.ErrUsername}</p>
                      ) : (
                        <p>{valiErrMessage.ErrUsername}</p>
                      )
                    ) : (
                      ''
                    )}
                    <InputBox>
                      <label>비밀번호</label>
                      <input
                        onChange={onChangePassword}
                        type={'password'}
                        placeholder="비밀번호를 입력해주세요."
                      ></input>
                    </InputBox>
                    {valiErrMessage.ErrPassword ? (
                      valiInfo.isPassword ? (
                        <p style={{ color: 'black' }}>{valiErrMessage.ErrPassword}</p>
                      ) : (
                        <p>{valiErrMessage.ErrPassword}</p>
                      )
                    ) : (
                      ''
                    )}
                    <InputBox>
                      <label>비밀번호 확인</label>
                      <input
                        onChange={onChangePasswordConfirm}
                        type={'password'}
                        placeholder="비밀번호를 다시 입력해주세요."
                      ></input>
                    </InputBox>
                    {valiErrMessage.ErrPasswordConfirm ? (
                      valiInfo.isPasswordConfirm ? (
                        <p style={{ color: 'black' }}>
                          {valiErrMessage.ErrPasswordConfirm}
                        </p>
                      ) : (
                        <p>{valiErrMessage.ErrPasswordConfirm}</p>
                      )
                    ) : (
                      ''
                    )}
                    {errorMessage ? <p>{errorMessage}</p> : ''}
                    <StyledButton
                      onClick={() =>
                        !(isEmail && isUsername && isPassword && isPasswordConfirm)
                          ? setErrorMessage(
                              '채우지 않았거나 유효하지 않은 입력이 있어요.'
                            )
                          : handleSignup()
                      }
                    >
                      회원가입
                    </StyledButton>
                    <FlexEndGroup>
                      <span onClick={handleToggle}>로그인 화면으로 돌아가기</span>
                    </FlexEndGroup>
                  </FormBox>
                </ModalContainer>
              )}
            </ModalView>
          </ModalBackdrop>
        </StyledWrapper>
      ) : (
        ''
      )}
    </>
  );
};

export default LoginModal;
