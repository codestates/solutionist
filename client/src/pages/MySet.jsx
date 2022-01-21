import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SetCard from '../components/SetCard';
import SetCardVerTwo from '../components/SetCardVerTwo';
import MoveTopButton from '../components/MoveTopButton';
import Footer from '../components/Footer';

import { getMySetsMade, getMySetsSolved } from '../api/SearchSetAPI';

const SetsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 56.6% 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    '. header .'
    '. cards .';
  margin: 1.5rem 0;
  grid-row-gap: 1.5rem;
  grid-column-gap: 1rem;
`;

const Header = styled.div`
  grid-area: header;
  font-size: 1.75rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  grid-area: cards;

  div:nth-child(n + 5) {
    display: ${(props) => (props.$display ? 'none' : '')};
  }
`;

const ShowBox = styled.section`
  display: flex;
  justify-content: flex-end;
  width: 56.6%;
  margin: 0 21.7% 1.2rem 21.7%;
`;

const Divider = styled.div`
  width: 56.6%;
  height: 2px;
  margin: 0 21.7%;
  background-color: var(--orangey-yellow);
`;

const MySet = () => {
  const [isMadeHidden, setIsMadeHidden] = useState(true);
  const handleMadeHidden = () => {
    setIsMadeHidden(!isMadeHidden);
  };

  const [isSolvedHidden, setIsSolvedHidden] = useState(true);
  const handleSolvedHidden = () => {
    setIsSolvedHidden(!isSolvedHidden);
  };

  // * 내가 만든 세트 API 통신
  const [mySetsMade, setMySetsMade] = useState([]);

  useEffect(() => {
    setMySetsMade([]);
    const sendAPICall = async () => {
      const data = await getMySetsMade();
      console.log('made', data.data.findSet);
      setMySetsMade(data.data.findSet);
    };
    sendAPICall();
  }, []);

  // * 내가 푼 세트 API 통신
  const [mySetsSolved, setMySetsSolved] = useState([]);

  useEffect(() => {
    setMySetsSolved([]);
    const sendAPICall = async () => {
      const data = await getMySetsSolved();
      console.log('solved', data.data.findSet);
      setMySetsSolved(data.data.findSet);
      // Todo : map할때 props에 isMade 보내서 만든/푼 구분
    };
    sendAPICall();
  }, []);

  return (
    <>
      <SetsContainer>
        {/* 상단 이동 버튼 테스트 */}
        <MoveTopButton />
        <Header>내가 만든 세트</Header>
        <CardsContainer $display={isMadeHidden}>
          {mySetsMade.map((made) => (
            <SetCardVerTwo
              isMade={true}
              averageScore={made.averageScore}
              id={made.id}
              createdAt={made.createdAt}
              description={made.descriptoin}
              solvedUserNumber={made.solvedUserNumber}
              title={made.title}
              key={made.id}
              collectionId={made.collectionId}
              // creator={made.creator}
              // updatedAt={made.updatedAt}
            />
          ))}
        </CardsContainer>
      </SetsContainer>
      <ShowBox onClick={handleMadeHidden}>
        {isMadeHidden ? <p>Show More</p> : <p>Show less</p>}
      </ShowBox>
      <Divider />
      <SetsContainer>
        <Header>내가 푼 세트</Header>
        <CardsContainer $display={isSolvedHidden}>
          {mySetsSolved.map((solve) => (
            <SetCardVerTwo
              isMade={false}
              averageScore={solve.averageScore}
              id={solve.id}
              createdAt={solve.createdAt}
              description={solve.descriptoin}
              solvedUserNumber={solve.solvedUserNumber}
              title={solve.title}
              key={solve.id}
              recordId={solve.recordId}
              // creator={solve.creator}
              // updatedAt={solve.updatedAt}
            />
          ))}
        </CardsContainer>
      </SetsContainer>
      <ShowBox onClick={handleSolvedHidden}>
        {isSolvedHidden ? <p>Show More</p> : <p>Show less</p>}
      </ShowBox>
      <Footer />
    </>
  );
};

export default MySet;
