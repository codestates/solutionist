import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import SetCardVerTwo from '../components/SetCardVerTwo';
import MoveTopButton from '../components/MoveTopButton';
import { searchSets, popularSets } from '../api/SearchSetAPI';

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
  max-height: ${(props) => (props.isMadeHidden || !props.isSearch ? '416px' : 'initial')};
  overflow: ${(props) => (props.isMadeHidden || !props.isSearch ? 'hidden' : 'initial')};
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

// * Search Bar
const SearchContainer = styled.div`
  display: flex;
  width: 60%;
  margin: 2rem auto 1rem;

  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 1rem;
  }
`;
const SearchInput = styled.input`
  width: calc(100% - 55px);
  height: 48px;
  padding: 0 0 0 5px;
  border-bottom: 2px solid black;
  font-size: 1.5rem;
  font-family: 'GowunDodum-Regular', sans-serif;
`;
const SearchIconContainer = styled.div`
  width: 46px;
  height: 46px;
  border: 2px solid black;
  border-radius: 10px 10px 10px 0;
  background-color: var(--butterscotch);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    cursor: pointer;
  }
`;

const Search = () => {
  const [isMadeHidden, setIsMadeHidden] = useState(true);
  const [showShow, setShowShow] = useState(false);
  const handleMadeHidden = () => {
    setIsMadeHidden(!isMadeHidden);
  };

  // * search API
  const [searchedSets, setSearchedSets] = useState([]);
  const [popSets, setPopSets] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [message, setMessage] = useState('검색중...');

  // * Search Bar
  const [searchKey, setSearchKey] = useState('');

  const handleInputChange = (event) => {
    setSearchKey(event.target.value);
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!searchKey) setIsSearch(false);
    else {
      setSearchedSets([]);
      const sendAPICall = async () => {
        const data = await searchSets(searchKey);
        if (data) {
          setSearchedSets(data.data);
          setIsSearch(true);
        }
      };
      sendAPICall();
    }
  };

  useEffect(() => {
    if (searchedSets.length === 0) {
      setMessage('검색 결과가 없습니다 :(');
    }
  });

  useEffect(() => {
    setPopSets([]);
    const sendAPICall = async () => {
      const data = await popularSets();
      setPopSets(data.data);
    };
    sendAPICall();
  }, []);

  useEffect(() => {
    if (cardRef.current?.scrollHeight > 416) setShowShow(true);
    else setShowShow(false);
  }, [searchedSets]);

  const cardRef = useRef(null);

  return (
    <Container>
      <SearchContainer onSubmit={() => false}>
        <SearchInput
          type="text"
          onChange={handleInputChange}
          onKeyUp={handleSearch}
          placeholder="어떤 문제를 풀어볼까요?"
        />
        <SearchIconContainer>
          <img src="/assets/icons/search.svg" alt="search-icon" onClick={handleSearch} />
        </SearchIconContainer>
      </SearchContainer>
      <MoveTopButton />
      {isSearch ? (
        <>
          <SetsContainer>
            <Header>검색 결과</Header>
            <CardsContainer
              $display={isMadeHidden}
              ref={cardRef}
              isMadeHidden={isMadeHidden}
              isSearch={isSearch}
            >
              {searchedSets.length === 0 ? (
                <p>{message}</p>
              ) : (
                <>
                  {searchedSets.map((search) => (
                    <SetCardVerTwo
                      isSearch={isSearch}
                      averageScore={search.averageScore}
                      id={search.id}
                      createdAt={search.createdAt}
                      creator={search.creator}
                      description={search.description}
                      solvedUserNumber={search.solvedUserNumber}
                      title={search.title}
                      key={search.id}
                      updatedAt={search.updatedAt}
                    />
                  ))}
                </>
              )}
            </CardsContainer>
          </SetsContainer>
          <ShowBox onClick={handleMadeHidden}>
            {showShow ? isMadeHidden ? <p>Show More</p> : <p>Show less</p> : ''}
          </ShowBox>
        </>
      ) : (
        <>
          <SetsContainer>
            <Header>인기 세트</Header>
            <CardsContainer $display={isMadeHidden}>
              {popSets.map((pop) => (
                <SetCardVerTwo
                  isSearch={!isSearch}
                  averageScore={pop.averageScore}
                  id={pop.id}
                  createdAt={pop.createdAt}
                  creator={pop.creator}
                  description={pop.description}
                  solvedUserNumber={pop.solvedUserNumber}
                  title={pop.title}
                  key={pop.id}
                  updatedAt={pop.updatedAt}
                />
              ))}
            </CardsContainer>
          </SetsContainer>
        </>
      )}
    </Container>
  );
};

export default Search;
