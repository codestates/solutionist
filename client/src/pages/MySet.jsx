import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// import SetCard from '../components/SetCard';
// import Footer from '../components/Footer';
import SetCardVerTwo from '../components/SetCardVerTwo';
import MoveTopButton from '../components/MoveTopButton';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import { getMySetsMade, getMySetsSolved } from '../api/SearchSetAPI';

const Container = styled.div`
  max-width: 1216px;
  margin: 0 auto;
`;

const SetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  margin: 0 auto 0.5rem auto;
  font-size: 1rem;
  color: var(--warm-grey);
  user-select: none;
  p {
    :last-child {
      cursor: pointer;
    }
  }

  @media all and (max-width: 767px) {
    width: calc(100% - 1rem);
    margin: 0 0.5rem 0.5rem 0.5rem;
  }
`;

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  font-family: 'GongGothicMedium', sans-serif;
  margin: 1rem 0;
  @media all and (max-width: 767px) {
    margin-left: 0.5rem;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-height: ${(props) =>
    props.isMadeHidden || props.isSolvedHidden ? '208px' : 'initial'};
  overflow: ${(props) =>
    props.isMadeHidden || props.isSolvedHidden ? 'hidden' : 'initial'};
`;

const StyledLink = styled(Link)`
  color: var(--warm-grey);
  overflow: initial;
  line-height: 25px;
`;

const ShowBox = styled.section`
  display: flex;
  justify-content: flex-end;
  width: 60%;
  margin: 0 auto;

  @media all and (max-width: 767px) {
    width: 90%;
    margin: 0 5%;
  }
`;

const Divider = styled.div`
  width: 60%;
  height: 2px;
  margin: 1rem auto 0 auto;
  background-color: var(--orangey-yellow);

  @media all and (max-width: 767px) {
    width: 90%;
    margin: 1rem auto 0 auto;
    /* width: calc(100% - 2rem); */
    /* margin: 0 5%; */
  }
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

  const [showMade, setShowMade] = useState(false);
  const [showSolve, setshowSolve] = useState(false);

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
    };
    sendAPICall();
  }, []);

  const cardRefMade = useRef(null);
  const cardRefSolve = useRef(null);

  useEffect(() => {
    if (cardRefMade.current?.scrollHeight > 208) setShowMade(true);
    else setShowMade(false);
    if (cardRefSolve.current?.scrollHeight > 208) setshowSolve(true);
    else setshowSolve(false);
  });

  return (
    <Container>
      {/* 상단 이동 버튼 테스트 */}
      <MoveTopButton />
      <SetsContainer>
        <Header>내가 만든 세트</Header>
        <CardsContainer ref={cardRefMade} isMadeHidden={isMadeHidden}>
          {mySetsMade.length === 0 ? (
            <p>
              <StyledLink to="/make">
                내가 만든 세트가 없습니다. 만들러 가볼까요?{' '}
                <FaArrowRight size="0.75rem" />
              </StyledLink>
            </p>
          ) : (
            mySetsMade.map((made) => (
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
            ))
          )}
        </CardsContainer>
      </SetsContainer>
      <ShowBox onClick={handleMadeHidden}>
        {showMade ? isMadeHidden ? <p>Show More</p> : <p>Show less</p> : ''}
      </ShowBox>
      <Divider />
      <SetsContainer>
        <Header>내가 푼 세트</Header>
        <CardsContainer ref={cardRefSolve} isSolvedHidden={isSolvedHidden}>
          {mySetsSolved.length === 0 ? (
            <p>
              <StyledLink to="/solve">
                내가 푼 세트가 없습니다. 풀러 가볼까요? <FaArrowRight size="0.75rem" />
              </StyledLink>
            </p>
          ) : (
            mySetsSolved.map((solve) => (
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
            ))
          )}
        </CardsContainer>
      </SetsContainer>
      <ShowBox onClick={handleSolvedHidden}>
        {showSolve ? isSolvedHidden ? <p>Show More</p> : <p>Show less</p> : ''}
      </ShowBox>
    </Container>
  );
};

export default MySet;
