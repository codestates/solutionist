import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import OIcon from '../icons/O';
import XIcon from '../icons/X';

const ProblemContainer = styled.div`
  margin: 0.5rem 0;
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-columns: 25% 1fr 25%;
  grid-template-areas:
    'number question  .'
    'number choice .'
    'statIcon stats .'
    'statIcon explanation .';

  @media all and (max-width: 1023px) {
    grid-template-columns: 20% 60% 20%;
  }
  @media all and (max-width: 767px) {
    margin: 0 1rem;
    grid-template-rows: auto auto auto auto auto auto;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'number statIcon'
      'question question'
      'choice choice'
      'counter counter'
      'stats stats'
      'explanation explanation';
  }
`;
const ProblemNum = styled.div`
  grid-area: number;
  text-align: end;
  color: ${(props) => props.color};
  font-size: 6rem;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  p {
    font-family: 'Righteous', sans-serif;
  }
  @media all and (max-width: 767px) {
    font-size: 2rem;
    text-align: start;
    margin-top: 1rem;
    margin-right: 0;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Question = styled.div`
  grid-area: question;
  margin: 1rem 0.5rem 0 0;
  height: auto;
  line-height: 125%;
  word-wrap: break-word;
  word-break: keep-all;
  font-size: 1.25rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  @media all and (max-width: 767px) {
    font-size: 1rem;
  }
`;
const ChoicesContainer = styled.ol`
  grid-area: choice;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;
const Choice = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--warm-grey);
  color: var(--warm-grey);
  background-color: ${(props) => props.backgroundColor};
`;
const ChoiceNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  align-self: start;
  width: 2rem;
  font-size: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;
const ChoiceContent = styled.div`
  flex: 1;
  width: 100%;
  margin: 0.25rem 0.5rem 0.25rem 0;
  padding: 0.25rem 0;
  color: black;
  font-size: 1rem;
  height: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: keep-all;
`;
const ExplanationContainer = styled.div`
  grid-area: explanation;
`;
const Explanation = styled.div`
  width: calc(100% - 1.5rem - 2px);
  margin: 0 0 1rem 0;
  padding: 0.5rem 0.75rem;
  border: 1px dashed var(--warm-grey);
  border-radius: 10px;
  background-color: white;
  color: var(--warm-grey);
  font-size: 0.75rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: keep-all;
`;
const OxChoices = styled.div`
  display: flex;
  justify-content: space-evenly;
  grid-area: choice;
  margin-top: 1rem;
`;
const OxCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 100%;
  max-width: 12rem;
  max-height: 12rem;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  svg {
    height: 100%;
    width: 100%;
    margin: 2rem;
  }
  @media all and (max-width: 767px) {
    max-width: 10rem;
    max-height: 10rem;
    svg {
      margin: 1.5rem;
    }
  }
`;
const ChartContainer = styled.div`
  grid-area: stats;
  display: flex;
  flex-direction: column;
  grid-gap: 0.25rem;
  margin-bottom: 1rem;
`;
const ChartLine = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr 3rem;
  grid-gap: 1rem;

  div:last-child {
    text-align: right;
  }
`;
const ChartStatNum = styled.div`
  text-align: right;
`;
const ChartBox = styled.div`
  height: 100%;
  border-left: 2px solid
    ${(props) => (props.backgroundColor ? props.backgroundColor : 'var(--warm-grey-50)')};
  width: ${(props) => (props.width ? `${props.width}%` : '0%')};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'var(--warm-grey-50)'};
`;

const ResultProblem = ({ idx, problem, navRefs, data }) => {
  const curIdx = idx;
  const index = idx + 1;
  const [isStat, setIsStat] = useState(false);

  return (
    <ProblemContainer ref={(el) => (navRefs.current[idx] = el)}>
      <ProblemNum
        color={
          data.userChoices && problem.answer
            ? data.userChoices[curIdx].choice === problem.answer
              ? 'var(--vibrant-green-50)'
              : 'var(--red-50)'
            : 'var(--orangey-yellow-50)'
        }
      >
        <p>{index}</p>
      </ProblemNum>
      <Question>{problem.question}</Question>
      <ChoicesContainer>
        {problem.isOX ? (
          <>
            <OxChoices>
              <OxCard id="O">
                <OIcon
                  id="O"
                  fill={
                    data.userChoices && problem.answer // 답이 있는 경우
                      ? data.userChoices[curIdx].choice === problem.answer
                        ? data.userChoices[curIdx].choice === 1
                          ? 'var(--vibrant-green-50)'
                          : 'var(--warm-grey)'
                        : data.userChoices[curIdx].choice === 1
                        ? 'var(--red-50)'
                        : problem.answer === 1
                        ? 'var(--vibrant-green-50)'
                        : 'var(--orangey-yellow-50)'
                      : data.userChoices && problem.answer === 0
                      ? data.userChoices[curIdx].choice === 1
                        ? 'var(--orangey-yellow)'
                        : 'var(--warm-grey)'
                      : 'var(--warm-grey)'
                  }
                />
              </OxCard>
              <OxCard id="X">
                <XIcon
                  id="X"
                  fill={
                    data.userChoices && problem.answer // 답이 있는 경우
                      ? data.userChoices[curIdx].choice === problem.answer
                        ? data.userChoices[curIdx].choice === 2
                          ? 'var(--vibrant-green-50)'
                          : 'var(--warm-grey)'
                        : data.userChoices[curIdx].choice === 2
                        ? 'var(--red-50)'
                        : problem.answer === 2
                        ? 'var(--vibrant-green-50)'
                        : 'var(--orangey-yellow-50)'
                      : data.userChoices && problem.answer === 0
                      ? data.userChoices[curIdx].choice === 2
                        ? 'var(--orangey-yellow)'
                        : 'var(--warm-grey)'
                      : 'var(--warm-grey)'
                  }
                />
              </OxCard>
            </OxChoices>
          </>
        ) : (
          <>
            {problem.choice.map((choice, idx) => (
              <Choice
                key={`choiceChecked ${idx + 1}`}
                backgroundColor={
                  data.userChoices && problem.answer // 답이 있는 경우
                    ? data.userChoices[curIdx].choice === problem.answer // 정답인 경우
                      ? data.userChoices[curIdx].choice === idx + 1
                        ? 'var(--vibrant-green-50)' // 선택 답은 초록
                        : '' // 아닌건 투명
                      : data.userChoices[curIdx].choice === idx + 1 // 오답인 경우
                      ? 'var(--red-50)' // 선택은 빨강
                      : problem.answer === idx + 1
                      ? 'var(--vibrant-green-50)' // 정답은 초록
                      : '' // 아닌건 투명
                    : data.userChoices && problem.answer === 0
                    ? data.userChoices[curIdx].choice === idx + 1
                      ? 'var(--orangey-yellow-50)'
                      : ''
                    : ''
                }
              >
                <ChoiceNum
                  fontWeight={
                    data.userChoices
                      ? data.userChoices[curIdx].choice === problem.answer
                        ? data.userChoices[curIdx].choice === idx + 1
                          ? 'bold'
                          : 'normal'
                        : data.userChoices[curIdx].choice === idx + 1
                        ? 'bold'
                        : problem.answer === idx + 1
                        ? 'bold'
                        : 'normal'
                      : 'normal'
                  }
                  color={
                    data.userChoices
                      ? data.userChoices[curIdx].choice === problem.answer
                        ? data.userChoices[curIdx].choice === idx + 1
                          ? 'black'
                          : ''
                        : data.userChoices[curIdx].choice === idx + 1
                        ? 'black'
                        : problem.answer === idx + 1
                        ? 'black'
                        : ''
                      : ''
                  }
                >{`${idx + 1}.`}</ChoiceNum>
                <ChoiceContent>{choice.content}</ChoiceContent>
              </Choice>
            ))}
          </>
        )}
      </ChoicesContainer>
      <ChartContainer rows={problem.choice.length + 1} isStat={isStat}>
        <ChartLine>
          <div>보기</div>
          <div></div>
          <div>비율</div>
        </ChartLine>
        {problem.choice.map((choice, idx) => (
          <ChartLine key={`p${curIdx}c${idx}`}>
            {problem.isOX ? (
              idx === 0 ? (
                <div>O</div>
              ) : (
                <div>X</div>
              )
            ) : (
              <div>{choice.index}.</div>
            )}

            <ChartBox
              width={data.userChoices ? data.userChoices[curIdx].selectionRate[idx] : ''}
              backgroundColor={
                data.userChoices && problem.answer // 답이 있는 경우
                  ? data.userChoices[curIdx].choice === problem.answer
                    ? data.userChoices[curIdx].choice === idx + 1
                      ? 'var(--vibrant-green-50)'
                      : ''
                    : data.userChoices[curIdx].choice === idx + 1
                    ? 'var(--red-50)'
                    : problem.answer === idx + 1
                    ? 'var(--vibrant-green-50)'
                    : ''
                  : ''
              }
            />
            <ChartStatNum>
              {data.userChoices
                ? Math.round(data.userChoices[curIdx].selectionRate[idx])
                : 0}
              %
            </ChartStatNum>
          </ChartLine>
        ))}
      </ChartContainer>
      <ExplanationContainer>
        {problem.explanation ? <Explanation>{problem.explanation}</Explanation> : ''}
      </ExplanationContainer>
    </ProblemContainer>
  );
};

export default ResultProblem;
