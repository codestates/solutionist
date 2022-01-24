import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { VscGithub, VscRepo } from 'react-icons/vsc';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-top: 2px solid var(--light--gray);
  background-color: var(--pale--gray);
`;

const Header = styled.h1`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--black);
`;

const Crew = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  a {
    padding: 0 1rem 0.125rem 1rem;
    margin: 0.5rem 0;
    border-right: 1px solid black;

    :last-child {
      border: none;
    }
  }

  @media all and (max-width: 767px) {
    width: 350px;
    a:nth-child(2) {
      border: none;
    }
  }
`;
const Icons = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  a {
    margin: 0 1rem;
  }
`;
const Copyright = styled.div`
  font-size: 0.75rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Header>TEAM MEMBER</Header>
      <Crew>
        <Link to="https://github.com/JAM-PARK" target="_blank">
          박재민 Front-End
        </Link>
        <Link to="https://github.com/jlthepi" target="_blank">
          이병찬 Front-End
        </Link>
        <Link to="https://github.com/widalida26" target="_blank">
          위다빈 Back-End
        </Link>
        <Link to="https://github.com/inde153" target="_blank">
          김동언 Back-End
        </Link>
      </Crew>
      <Icons>
        <Link to="https://github.com/codestates/solutionist" target="_blank">
          <VscGithub />
        </Link>
        <Link to="https://github.com/codestates/solutionist/wiki" target="_blank">
          <VscRepo />
        </Link>
      </Icons>
      <Copyright>© 2022 SOLUTIONIST. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
