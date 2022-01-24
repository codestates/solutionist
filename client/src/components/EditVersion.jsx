import axios from 'axios';
import React, { useState, useEffect } from 'react';

import styled, { keyframes } from 'styled-components';

const fromRight = keyframes`
  from {
    transform: translateX(100%)
  }

  to {
    transform: translateX(0)
  }
  
`;
const ContainerAbsolute = styled.div`
  position: sticky;
  display: flex;
  justify-content: flex-end;
  top: 4rem;
  right: 0;
  margin-left: auto;
  z-index: 900;
  @media all and (min-width: 1216px) {
    width: calc(100vw - 50vw + 608px);
  }
`;
const Container = styled.div`
  display: ${(props) => (props.versionOn ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  width: calc(25% - 2rem);
  height: calc(100vh - 4rem);
  margin-top: -1rem;
  background-color: white;
  border-left: 1px solid var(--warm-grey-50);
  animation: ${fromRight} 0.5s cubic-bezier(0, 0, 0.2, 1);

  @media all and (max-width: 1023px) {
    width: 50%;
  }
`;
const Version = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid black;
  background-color: ${(props) =>
    props.backgroundColor ? 'var(--butterscotch)' : 'none'};
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.backgroundColor ? 'var(--butterscotch)' : 'var(--orangey-yellow-50)'};
  }
  p {
    font-family: 'GowunDodum-Regular', sans-serif;
    margin-bottom: 0.25rem;
    user-select: none;
    :nth-child(2) {
      font-size: 0.75rem;
    }
    :last-child {
      color: var(--warm-grey);
      font-size: 0.75rem;
      text-align: right;
    }
  }
`;
const VersionContainer = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    flex: 1;
    color: var(--warm-grey);
    box-shadow: 0 0 0 2px inset var(--warm-grey);
    :hover {
      color: black;
      box-shadow: 0 0 0 2px inset black;
    }
  }
  div:first-child {
    flex: 2;
    color: black;
    background-color: var(--butterscotch);
    box-shadow: 0 0 0 2px inset black;
    font-weight: bold;
    :hover {
      background-color: black;
      color: var(--butterscotch);
    }
  }
`;
const Button = styled.div`
  display: flex;
  height: 2.5rem;
  margin: 0.5rem;
  font-size: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;
const EditVersion = ({ versionOn, setVersionOn, collectionId, setData }) => {
  const [versions, setVersions] = useState([]);
  const [clickIdx, setClickIdx] = useState(null);

  useEffect(() => {
    if (collectionId && versionOn) {
      axios
        .get(`${process.env.SERVER_URL}sets/collections/${collectionId}`)
        .then((res) => {
          setVersions(res.data);
          console.log(res.data);
        });
    }
  }, [versionOn]);

  const handleRestore = () => {
    if (clickIdx >= 0) {
      axios
        .get(`${process.env.SERVER_URL}sets/${versions[clickIdx].id}`)
        .then((res) => setData(res.data))
        .then(() => {
          setClickIdx(undefined);
          setVersionOn(false);
        });
    }
  };

  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return new Date(value).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });
  };

  return (
    <ContainerAbsolute>
      <Container versionOn={versionOn}>
        <VersionContainer>
          {versions[0]
            ? versions.map((version, idx) => (
                <Version
                  key={`v${idx}`}
                  onClick={() => setClickIdx(idx)}
                  backgroundColor={idx === clickIdx}
                >
                  <p>{timeForToday(version.updatedAt)} 수정됨</p>
                  <p>by{version.editor}</p>
                  <p>문제 개수 : {version.problemCount}</p>
                </Version>
              ))
            : ''}
        </VersionContainer>
        <ButtonContainer>
          <Button onClick={handleRestore}>되돌리기</Button>
          <Button onClick={() => setVersionOn(false)}>취소</Button>
        </ButtonContainer>
      </Container>
    </ContainerAbsolute>
  );
};

export default EditVersion;
