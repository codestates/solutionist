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
    margin: 0 15% 0 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0 1rem;
  }
`;

const ImageContainer = styled.div`
  flex: 2;
  /* z-index: 1; */
  height: 100%;
  max-width: 40%;
  max-height: 40%;

  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
`;

const Tutorial = () => {
  const [tutorialIdx, setTutorialIdx] = useState(3);
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
      `translateX(${100 - tutorialIdx * 20}%)`,
      'important'
    );
  }, [tutorialIdx]);

  return (
    <Container>
      {/* <button className="tutorial__close-btn" onClick={close}>
        &times;
      </button> */}
      {tutorialIdx > 3 ? (
        <button className="tutorial__prev-btn" onClick={handleMoveToPrev}>
          {/* <img src="/images/prev-pink.png" alt="" /> */}
          이전
        </button>
      ) : (
        <></>
      )}
      {tutorialIdx < 7 ? (
        <button
          className="tutorial__next-btn"
          onClick={tutorialIdx < 7 ? handleMoveToNext : ''}
        >
          {/* <img src="/images/next-pink.png" alt="" /> */}
          다음
        </button>
      ) : (
        <></>
      )}
      <div className="tutorial__img">
        <ul className="tutorial__img-list" ref={slideTutorial}>
          <li className="tutorial__img-item">
            <ImageContainer>
              <img src="../../assets/images/Section1.png" />
            </ImageContainer>
            1페이지
          </li>
          <li className="tutorial__img-item">
            <ImageContainer>
              <img src="../../assets/images/Section2.gif" />
            </ImageContainer>
            2페이지
          </li>
          <li className="tutorial__img-item">
            <ImageContainer>
              <img src="../../assets/images/Section3.gif" />
            </ImageContainer>
            3페이지
          </li>
          <li className="tutorial__img-item">
            <ImageContainer>
              <img src="../../assets/images/Section4.gif" />
            </ImageContainer>
            4페이지
          </li>
          <li className="tutorial__img-item tip">
            <ImageContainer>
              <img src="../../assets/images/Section5.gif" />
            </ImageContainer>
            5페이지
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Tutorial;
