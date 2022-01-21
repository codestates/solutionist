import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import MenuDropDownContainer from '../containers/MenuDropDownContainer';
import { FaSignInAlt, FaBars } from 'react-icons/fa';
import LogoFull from '../icons/Logo';

const UnderlineFadeIn = keyframes`
  from {
    box-shadow: 0 0 0 0px inset var(--butterscotch);
  }
  to{
    box-shadow: 0 -0.25rem 0 0px inset var(--butterscotch);
  }
`;

const NavContainer = styled.div`
  width: 100vw;
  height: 3rem;
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  z-index: 998;

  div:last-child {
    z-index: 999;
  }
`;
const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: 'logo logo make solve . . .  login';
  grid-gap: 1rem;
  align-items: center;
  width: calc(100% - 1rem);
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;

  @media all and (max-width: 1023px) {
  }
  @media all and (max-width: 767px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: 'logo make solve login';
  }
`;
const LogoContainer = styled.div`
  grid-area: logo;
  width: 100%;
  height: 2.75rem;
  * {
    height: 100%;
  }
`;
const MakeContainer = styled.div`
  grid-area: make;
  width: 100%;
  height: 100%;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &:hover {
      box-shadow: 0 -0.25rem 0 0px inset var(--butterscotch);
      animation: ${UnderlineFadeIn} 0.25s ease;
    }
    p {
      font-size: 1.25rem;
      font-family: 'Righteous', sans-serif;
    }
    @media all and (max-width: 767px) {
      font-size: 1rem;
    }
  }
`;
const SolveContainer = styled.div`
  grid-area: solve;
  width: 100%;
  height: 100%;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1.25rem;
    &:hover {
      box-shadow: 0 -0.25rem 0 0px inset var(--butterscotch);
      animation: ${UnderlineFadeIn} 0.25s ease;
    }
    p {
      font-size: 1.25rem;
      font-family: 'Righteous', sans-serif;
    }
    @media all and (max-width: 767px) {
      font-size: 1rem;
    }
  }
`;
const LoginContainer = styled.div`
  grid-area: login;
  display: flex;
  justify-content: flex-end;
`;
const Login = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: var(--butterscotch);
  justify-content: flex-end;
  box-shadow: 0 0 0 2px inset black;
  cursor: pointer;

  :hover {
    background-color: black;
    * {
      color: var(--butterscotch);
    }
  }

  * {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    color: black;
    font-family: 'Righteous', sans-serif;
  }
  > :first-child {
    @media all and (max-width: 767px) {
      display: none;
    }
  }
  > :last-child {
    display: none;
    @media all and (max-width: 767px) {
      display: flex;
    }
  }
`;
const MenuIconContainer = styled.div`
  font-size: 2rem;
  display: flex;
  grid-area: login;
  justify-content: flex-end;
  opacity: 0.5;

  * {
    cursor: pointer;
    :hover {
      opacity: 1;
    }
  }
`;

const Nav = ({ onLoginModalOnAction, isLogin }) => {
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDown = () => {
    if (isDropDown) setIsDropDown(false);
    else setIsDropDown(true);
  };

  return (
    <NavContainer>
      <NavGrid>
        <LogoContainer>
          <Link to="/">
            <LogoFull />
          </Link>
        </LogoContainer>
        <MakeContainer>
          <Link to="/make">
            <p> MAKE</p>
          </Link>
        </MakeContainer>
        <SolveContainer>
          <Link to="/solve">
            <p> SOLVE</p>
          </Link>
        </SolveContainer>
        {isLogin ? (
          <MenuIconContainer>
            <FaBars onClick={handleDropDown} />
          </MenuIconContainer>
        ) : (
          <LoginContainer>
            <Login onClick={onLoginModalOnAction}>
              <span>LOGIN</span>
              <FaSignInAlt />
            </Login>
          </LoginContainer>
        )}
      </NavGrid>
      {isDropDown ? <MenuDropDownContainer handleDropDown={handleDropDown} /> : ''}
    </NavContainer>
  );
};

export default Nav;
