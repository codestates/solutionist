import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ResultProblem from '../components/ResultProblem';
import { useParams } from 'react-router-dom';

const MakeContainer = styled.div`
  position: relative;
  height: calc(100% - 4rem - 70px);
  padding: 1rem 0 2rem;
  max-width: 1216px;
  margin: 0 auto;

  *::placeholder {
    opacity: 0.5;
  }
`;
const Header = styled.div`
  width: 50%;
  margin: 0 25% 0.5rem 25%;
  font-size: 1rem;
  color: var(--warm-grey);
  user-select: none;
  p {
    font-family: 'GongGothicMedium', sans-serif;
  }

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0 15% 0.5rem 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0 1rem 0.5rem 1rem;
    font-size: 0.75rem;
  }
`;
const Title = styled.div`
  align-items: center;
  width: 50%;
  margin: 0 25% 0 25%;
  line-height: 120%;
  font-size: 2rem;
  font-weight: bold;
  word-wrap: break-word;
  word-break: keep-all;

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0 15% 0 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0 1rem;
    font-size: 1.5rem;
    height: 29px;
  }
`;
const Desc = styled.div`
  align-items: center;
  width: 50%;
  margin: 0.5rem 25%;
  line-height: 120%;
  font-size: 1.25rem;
  word-wrap: break-word;
  word-break: keep-all;

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0.5rem 15% 0.5rem 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0.5rem 1rem;
    font-size: 1rem;
    height: 21px;
  }
`;
const Rate = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin: 1rem 25%;
  font-size: 1.25rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  text-align: right;
  word-wrap: break-word;
  word-break: keep-all;
  > div > div {
    font-family: 'Righteous', 'GongGothicMedium', sans-serif;
    :last-child {
      font-size: 5rem;
      color: var(--warm-grey);
    }
  }

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 1rem 15% 1rem 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 1rem 1rem;
    font-size: 1rem;
    > div > div:last-child {
      font-size: 3rem;
    }
  }
`;
const Divider = styled.div`
  width: 50%;
  height: 2px;
  margin: 0 25%;
  background-color: var(--orangey-yellow);

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0 15% 0 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0 1rem;
  }
`;
const SidebarContainer = styled.div`
  position: sticky;
  float: 0;
  top: 4rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 50% 1fr;
  grid-template-areas: '. . sidebar';

  @media all and (max-width: 1023px) {
    display: none;
  }
`;
const SideRelative = styled.div`
  grid-area: sidebar;
  position: relative;
`;
const Sidebar = styled.div`
  position: absolute;
  left: 0;
  margin-left: 1rem;
  padding: 0 1rem;
  border-left: 2px dashed var(--warm-grey);
  color: var(--warm-grey);
  width: calc(100% - 4rem - 2px);
  div {
    font-size: 0.75rem;
  }
`;
const SidebarContent = styled.div`
  margin-bottom: 0.25rem;
  display: flex;
  color: ${(props) => props.color};
  div {
    font-family: 'GowunDodum-Regular', sans-serif;
    font-weight: ${(props) => props.weight};
    word-wrap: break-word;
    word-break: keep-all;
    width: 100%;
    line-height: 120%;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    :first-child {
      width: auto;
      margin-right: 0.5rem;
    }
  }
`;

const Result = () => {
  const { setId, recordId } = useParams();
  const [set, setSet] = useState({
    title: '',
    description: '',
    problems: [],
  });
  const [curPos, setCurPos] = useState(0);
  const makeRef = useRef(null);
  const navRefs = useRef([0]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.SERVER_URL}sets/${setId}`).then((res) => {
      setSet(res.data);
    });

    axios.get(`${process.env.SERVER_URL}solve-records/${recordId}`).then((res) => {
      res.data.userChoices.sort((a, b) => a.problemId - b.problemId);
      setData(res.data);
    });
  }, []);

  const handleNav = (e) => {
    navRefs.current[e.target.id].scrollIntoView({ behavior: 'smooth' });
  };

  const [Qpos, setQpos] = useState([]);

  useEffect(() => {
    const arr = [0];
    navRefs.current
      .map((el) => {
        if (el) return el.offsetTop;
      })
      .reduce((acc, cur) => {
        if (!isNaN(cur)) {
          arr.push((cur + acc) / 2);
          return cur;
        }
      });
    setQpos(arr);
  }, [set]);

  const handleScroll = (e) => {
    for (let i = 0; i < Qpos.length; i++) {
      if (Qpos[i] - 100 < makeRef.current.scrollTop) {
        setCurPos(i);
      }
    }
  };

  let count = 0;
  let total = set.problems.filter((el) => el.answer !== 0).length;
  set.problems.map((problem, idx) => {
    if (data.userChoices) {
      if (problem.answer === data.userChoices[idx].choice) {
        count++;
      }
    }
  });

  return (
    <MakeContainer onScroll={handleScroll} ref={makeRef}>
      <Header>
        <p>세트 결과</p>
      </Header>
      <Title> {set.title} </Title>
      <Desc>{set.description}</Desc>
      {total ? (
        <Rate>
          <div>
            <div>내 정답률</div>
            <div>{Math.round((count / total) * 100)}%</div>
          </div>
          <div>
            <div>전체 평균</div>
            <div>{Math.round(data.totalRate)}%</div>
          </div>
        </Rate>
      ) : (
        ''
      )}
      <Divider />
      <SidebarContainer>
        <SideRelative>
          <Sidebar>
            {set.problems.map((problem, idx) => (
              <SidebarContent
                onClick={handleNav}
                id={idx}
                key={`#Q${idx + 1}`}
                weight={curPos === idx ? 'bold' : 'normal'}
              >
                <div id={idx}>{idx + 1}</div>
                <div id={idx}>{problem.question}</div>
              </SidebarContent>
            ))}
          </Sidebar>
        </SideRelative>
      </SidebarContainer>
      {set.problems.map((problem, idx) => (
        <React.Fragment key={`p${idx}`}>
          <ResultProblem
            key={problem.index}
            problem={problem}
            set={set}
            idx={idx}
            navRefs={navRefs}
            data={data}
          />
          <Divider />
        </React.Fragment>
      ))}
    </MakeContainer>
  );
};

export default Result;
