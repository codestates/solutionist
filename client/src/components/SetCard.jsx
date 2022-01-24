import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import SubmenuIcon from '../icons/Submenu';
import ShareIcon from '../icons/Share';
import ChartIcon from '../icons/Chart';
import UserIcon from '../icons/User';
import EditIcon from '../icons/Edit';
import DecreaseIcon from '../icons/Decrease';
import TrashIcon from '../icons/Trash';

const anim = keyframes`
  from{
  }
  to {
    transform: rotateY(180deg)
    }
`;
const CardContainer = styled.div`
  position: relative;
  perspective: 1000px;
`;
const CardFront = styled.div`
  width: 100%;
  height: 15rem;
  background-color: white;
  border: 1px solid var(--warm-grey);
  border-radius: 10px;
  backface-visibility: hidden;
  transform: ${(props) => (props.isFlipped ? 'rotateY(-180deg)' : '')};
  transition: 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 2rem);
  margin: 1rem;
`;
const SetInfo = styled.div``;
const SetName = styled.div`
  font-size: 1.25rem;
`;
const SetDesc = styled.div`
  margin-top: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  justify-self: flex-end;
  * {
    font-family: 'GowunDodum-Regular', sans-serif;
  }
`;
const Icon = styled.div`
  width: 1rem;
  height: 1rem;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;
const StatsContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Stat = styled.li`
  display: flex;
  margin-top: 0.5rem;
  > p {
    margin-left: 0.5rem;
  }
`;
const CardBack = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 15rem;
  border-radius: 10px;
  border: 1px solid var(--warm-grey);
  background-color: var(--warm-grey);
  backface-visibility: hidden;
  transform: ${(props) => (props.isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)')};
  transition: 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
`;
const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;
const Menu = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
  margin: auto;
  color: white;
`;

const SetCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CardContainer>
      <CardFront isFlipped={isFlipped}>
        <InfoContainer>
          <SetInfo>
            <SetName>아주 쉬운 문제들</SetName>
            <SetDesc>정말 쉬워서 발로 풀어도 100점 맞을 수 있습니다.</SetDesc>
          </SetInfo>
          <IconContainer>
            <Icon onClick={() => setIsFlipped(true)}>
              <SubmenuIcon />
            </Icon>
            <StatsContainer>
              <Stat>
                <Icon>
                  <UserIcon />
                </Icon>
                <p>90명</p>
              </Stat>
              <Stat>
                <Icon>
                  <ChartIcon />
                </Icon>
                <p>90점</p>
              </Stat>
            </StatsContainer>
          </IconContainer>
        </InfoContainer>
      </CardFront>
      <CardBack isFlipped={isFlipped}>
        <InfoContainer>
          <MenuContainer>
            <Menu>
              <EditIcon fill="white" /> 수정
            </Menu>
            <Menu>
              <ShareIcon fill="white" /> 공유
            </Menu>
            <Menu>
              <TrashIcon fill="white" /> 삭제
            </Menu>
          </MenuContainer>
          <Icon onClick={() => setIsFlipped(false)}>
            <DecreaseIcon fill="white" />
          </Icon>
        </InfoContainer>
      </CardBack>
    </CardContainer>
  );
};

export default SetCard;
