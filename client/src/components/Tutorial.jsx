import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ArrowRight = keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(0.25rem) scale(1.05, 0.9);
}

`;
const ArrowLeft = keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(-0.25rem) scale(1.05, 0.9);
}
`;

const Container = styled.div`
  position: relative;
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
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  top: 1rem;
  left: 1rem;
  z-index: 900;
  cursor: pointer;
  :hover {
    animation: ${ArrowLeft} 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) infinite alternate;
  }
`;

const MoveBtnNext = styled.button`
  position: absolute;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  top: 1rem;
  right: 1rem;
  z-index: 900;
  cursor: pointer;
  :hover {
    animation: ${ArrowRight} 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) infinite alternate;
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
        <MoveBtnPrev onClick={handleMoveToPrev}>
          <FaChevronLeft />
        </MoveBtnPrev>
      ) : (
        ''
      )}
      {tutorialIdx < 7 ? (
        <MoveBtnNext onClick={handleMoveToNext}>
          <FaChevronRight />
        </MoveBtnNext>
      ) : (
        ''
      )}
      <ImageContainer>
        <ImageList ref={slideTutorial}>
          {imagesArr.map((image) => (
            <ImageItem key={image}>
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
