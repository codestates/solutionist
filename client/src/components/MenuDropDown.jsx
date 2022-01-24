import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { logout } from '../api/SettingAPI';
import { useSelector } from 'react-redux';

const FadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-5px);
}
to {
  opacity: 1;
}`;

const DropDownContainer = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0.5rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid var(--warm-grey);
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${FadeIn} 0.5s ease;
  div {
    font-family: 'GowunDodum-Regular', sans-serif;
  }
  @media all and (min-width: 1216px) {
    right: calc(50vw - 608px);
  }
`;

const ImageContainer = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: var(--warm-grey);
  border-radius: 50%;

  img {
    position: inherit;
    width: 6rem;
    height: 6rem;
    outline: none;
    display: block;
    border-radius: 50%;
  }
`;
const Username = styled.div`
  font-size: 1rem;
  margin-top: 1.25rem;
`;
const Email = styled.div`
  width: 10rem;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  border-bottom: 1px solid var(--warm-grey);
`;

const Menu = styled.div`
  margin: 0.5rem 0;
`;

const handleLogout = () => {
  logout()
    .then(() => {
      console.log('로그아웃 성공');
    })
    .catch((err) => {
      console.log('logout API 에러캐치', err);
    });
};

const MenuDropDown = ({ handleDropDown, onlogoutAction }) => {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.loginModal.userInfo,
  }));
  const { email, username, profileImage } = userInfo;

  // * 프로필 기본 이미지 적용 useRef
  const imgRef = useRef(null);

  return (
    <DropDownContainer>
      <ImageContainer>
        <img
          src={`${profileImage}`}
          ref={imgRef}
          onError={() => {
            return (imgRef.current.src =
              'https://i.pinimg.com/236x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg');
          }}
        />
      </ImageContainer>
      <Username>{username}</Username>
      <Email>{email}</Email>
      <Link to="/myset" onClick={handleDropDown}>
        <Menu>나의 세트</Menu>
      </Link>
      <Link to="/setting" onClick={handleDropDown}>
        <Menu>프로필 설정</Menu>
      </Link>
      <Link to="/">
        <Menu
          onClick={() => {
            handleDropDown();
            handleLogout();
            onlogoutAction();
          }}
        >
          로그아웃
        </Menu>
      </Link>
    </DropDownContainer>
  );
};

export default MenuDropDown;
