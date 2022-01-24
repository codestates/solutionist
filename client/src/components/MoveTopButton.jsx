import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import styled from 'styled-components';

const TopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  opacity: 0;
  z-index: -10;
  right: 2rem;
  bottom: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  font-size: 1.75rem;
  border: 1px solid var(--butterscotch);
  background: var(--very-light-pink);
  color: var(--butterscotch);
  box-shadow: 1px 1px 3px 1.5px rgba(0, 0, 0, 0.15);
  transition: opacity 0.3s ease-in;

  &.active {
    z-index: 10;
    opacity: 1;
    cursor: pointer;
  }

  &:hover,
  &:focus,
  &:active {
    outline: 0 none;
  }
`;

const MoveTopButton = () => {
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return (
    <TopButton
      className={BtnStatus ? 'active' : ''} // 버튼 노출 여부
      onClick={handleTop} // 버튼 클릭시 함수 호출
    >
      <IoIosArrowUp />
    </TopButton>
  );
};

export default MoveTopButton;
