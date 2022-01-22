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
  margin: 1rem 25% 0;
  overflow: hidden;
  border: 2px solid var(--warm-grey-50);

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 1rem auto 0;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 1rem 1rem 0;
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
  z-index: 900;

  @media all and (max-width: 1023px) {
    right: 4rem;
  }
  @media all and (max-width: 767px) {
    right: 17rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageList = styled.ul`
  width: 400%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: 0.5s ease;
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
    width: 100%;
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

  console.log(imagesArr);

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
          {imagesArr.map((image) => (
            <ImageItem>
              <Image>
                <img src={image} />
              </Image>
            </ImageItem>
          ))}
        </ImageList>
      </ImageContainer>
    </Container>
  );
};

export default Tutorial;
