import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--light--gray);
  border-radius: 4px;

  width: 50%;
  height: 400px;
  margin: 0 25%;

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0 auto;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0 1rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const MoveBtnPrev = styled.button`
  position: absolute;
  font-size: 1rem;
  font-weight: 500;
  border: 0;
  outline: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light--gray);
  width: 4rem;
  height: 4rem;

  left: 11rem;
  z-index: 999;

  @media all and (max-width: 1023px) {
    left: 4rem;
  }
  @media all and (max-width: 767px) {
    left: 17rem;
  }
`;

const MoveBtnNext = styled.button`
  position: absolute;
  font-size: 1rem;
  font-weight: 500;
  border: 0;
  outline: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light--gray);
  width: 4rem;
  height: 4rem;

  right: 11rem;
  z-index: 999;

  @media all and (max-width: 1023px) {
    right: 4rem;
  }
  @media all and (max-width: 767px) {
    right: 17rem;
  }
`;

const ImageContainer = styled.div`
  width: 400%;
  height: 100%;
`;

const ImageList = styled.ul`
  width: 400%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const ImageItem = styled.li`
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
  }
`;

const Image = styled.div`
  img {
    height: 100%;
    object-fit: scale-down;
  }
`;

const Tutorial = ({ imagesArr }) => {
  const [tutorialIdx, setTutorialIdx] = useState(4);
  const slideTutorial = useRef(null);

  const handleMoveToPrev = () => {
    setTutorialIdx(tutorialIdx - 1);
  };
  const handleMoveToNext = () => {
    setTutorialIdx(tutorialIdx + 1);
  };

  useEffect(() => {
    slideTutorial.current?.style.setProperty(
      'transform',
      `translateX(${100 - tutorialIdx * 25}%)`,
      'important'
    );
  }, [tutorialIdx]);

  return (
    <Container>
      {tutorialIdx > 4 ? (
        <MoveBtnPrev onClick={handleMoveToPrev}>이전</MoveBtnPrev>
      ) : (
        <></>
      )}
      {tutorialIdx < 7 ? (
        <MoveBtnNext onClick={tutorialIdx < 7 ? handleMoveToNext : ''}>다음</MoveBtnNext>
      ) : (
        <></>
      )}
      <ImageContainer>
        <ImageList ref={slideTutorial}>
          <ImageItem>
            <Image>
              <img src={imagesArr[0]} />
            </Image>
          </ImageItem>
          <ImageItem>
            <Image>
              <img src={imagesArr[1]} />
            </Image>
          </ImageItem>
          <ImageItem>
            <Image>
              <img src={imagesArr[2]} />
            </Image>
          </ImageItem>
          <ImageItem>
            <Image>
              <img src={imagesArr[3]} />
            </Image>
          </ImageItem>
        </ImageList>
      </ImageContainer>
    </Container>
  );
};

export default Tutorial;
