import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { device } from '../styles/Breakpoints';
import { MdEdit, MdCheck } from 'react-icons/md';
import { signOut, changeProfileImage, changeUsername } from '../api/SettingAPI';
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction, updateUserInfoAction } from '../modules/loginModal';

const MainContainer = styled.div`
  /* position: relative; */
  /* height: calc(100% - 190px); */
  padding: 60px 0;
  overflow: scroll;
`;

const SettingContainer = styled.div`
  display: grid;
  grid-template-rows: 4fr;
  grid-template-columns: 1fr 56.6% 1fr;
`;

const Title = styled.div`
  font-size: 3.75rem;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.75rem;
  margin-right: 5.9%;
`;

const Blank = styled.div`
  width: 100%;
  margin: 5.9% 0;
  border-bottom: 2px solid var(--orangey-yellow);
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;

const EditContainer = styled.div`
  display: flex;
`;

const EditPwContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5%;
  > p {
    /* margin-top: 10%; */
    font-size: 1.75rem;
  }
`;

const Nickname = styled.div`
  display: flex;
  > span {
    font-size: 3rem;
  }
  > svg {
    font-size: 3rem;
  }
`;

const ImageContainer = styled.div`
  width: 250px;
  height: 250px;
  background-color: var(--warm-grey);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 250px;
    height: 250px;
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
    width: 250px;
    height: 250px;
    outline: none;
    display: block;
    border-radius: 50%;
    cursor: pointer;
  }

  img {
    position: inherit;
    width: 250px;
    height: 250px;
    outline: none;
    display: block;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  font-family: GowunDodum-Regular;
  font-size: 1.66rem;
  border-bottom: 1px solid var(--warm-grey);
  ::placeholder {
    font-family: GowunDodum-Regular;
  }
`;

const PasswordContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  grid-template-areas:
    'one two'
    '. three';

  input:first-child {
    grid-area: one;
  }

  input:nth-child(2) {
    grid-area: two;
  }

  input:last-child {
    grid-area: three;
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
  padding: 0.5rem 1rem;
  border-radius: 10px;
  width: fit-content;
  height: fit-content;

  /* 색상 & 폰트 */
  background-color: #000;
  font-size: 1.5rem;
  color: #fbb74a;

  &:hover {
    opacity: 0.75;
  }
  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const Setting = () => {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.loginModal.userInfo,
  }));
  const { email, username, profileImage } = userInfo;

  // console.log(profileImage);

  // * 회원 탈퇴
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onlogoutAction = () => dispatch(logoutAction());

  const handleSignOut = () => {
    signOut()
      .then(() => {
        console.log('회원 탈퇴 성공');
        onlogoutAction();
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
        console.log(data);
        // TODO : data(res)의 image를 userinfo state(리덕스)에 반영하기
      } catch (err) {
        console.log('changeProfileImage err:', err);
      }
    };
    sendAPICall();
  };

  // * username 변경
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleEditUsername = () => {
    setIsUsernameEdit(true);
  };

  const handleSubmitNewUsername = () => {
    console.log('클릭');
    // axios
    changeUsername(newUsername)
      .then((res) => {
        console.log('changeUsername 요청 성공, res:', res);
        // onUpdateUserInfoAction(res.data.data);
      })
      .catch((err) => {
        console.log('changeUsername 실패', err);
      });
    setIsUsernameEdit(false);
  };

  const handleChangeNewUsername = (e) => {
    setNewUsername(e.target.value);
    console.log(newUsername);
  };

  return (
    <MainContainer>
      <SettingContainer>
        <div />
        <Title>
          설정
          <Blank />
        </Title>
        <div />
        <LeftSide>개인정보 수정</LeftSide>
        <div>
          <EditContainer>
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
                <Nickname>
                  <StyledInput
                    placeholder="새 Username 입력"
                    onChange={handleChangeNewUsername}
                  />
                  <MdCheck onClick={handleSubmitNewUsername} />
                </Nickname>
              ) : (
                <Nickname>
                  <span>{username}</span>
                  <MdEdit onClick={handleEditUsername} />
                </Nickname>
              )}
              <p>{email}</p>
            </PersonalInfo>
          </EditContainer>
          <Blank />
        </div>
        <div />
        <LeftSide>비밀번호 변경</LeftSide>
        <div>
          <EditPwContainer>
            <PasswordContainer>
              <StyledInput placeholder="현재 비밀번호" />
              <StyledInput placeholder="새 비밀번호" />
              <StyledInput placeholder="새 비밀번호 확인" />
            </PasswordContainer>
            <StyledButton>비밀번호 변경</StyledButton>
          </EditPwContainer>
          <Blank />
        </div>
        <div />
        <LeftSide>계정 관리</LeftSide>
        <StyledButton onClick={handleSignOut}>회원 탈퇴</StyledButton>
        <div />
      </SettingContainer>
    </MainContainer>
  );
};

export default Setting;
