import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import MakeProblem from '../components/MakeProblem';
import { FaPlusSquare, FaSave, FaArrowLeft } from 'react-icons/fa';

const MakeContainer = styled.div`
  height: calc(100% - 4rem - 70px);
  max-width: 1216px;
  margin: 0 auto;
  padding: 1rem 0 2rem;

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
const Title = styled.textarea`
  display: flex;
  align-items: center;
  width: 50%;
  height: 42px;
  margin: 0 25% 0 25%;
  line-height: 120%;
  font-size: 2rem;
  font-weight: bold;
  word-wrap: break-word;
  word-break: keep-all;
  resize: none;

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
const Desc = styled.textarea`
  display: flex;
  align-items: center;
  width: 50%;
  height: 26px;
  margin: 0.5rem 25% 1rem;
  line-height: 120%;
  font-size: 1.25rem;
  word-wrap: break-word;
  word-break: keep-all;
  resize: none;

  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 0.5rem 15% 1rem 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0.5rem 1rem;
    font-size: 1rem;
    height: 21px;
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 1rem 25% 0 25%;
  color: var(--warm-grey);
  font-size: 4rem;
  opacity: 0.5;
  svg {
    cursor: pointer;
    :hover {
      color: black;
    }
  }
  @media all and (max-width: 1023px) {
    width: 60%;
    margin: 1rem 15% 0 25%;
  }
  @media all and (max-width: 767px) {
    width: calc(100% - 2rem);
    margin: 0.5rem 1rem 0;
    font-size: 3rem;
  }
`;

const SidebarContainer = styled.div`
  position: sticky;
  float: 0;
  top: 4rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 25% 50% 25%;
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
  div {
    font-family: 'GowunDodum-Regular', sans-serif;
    font-weight: ${(props) => props.weight};
    word-wrap: break-word;
    word-break: keep-all;
    width: 100%;
    line-height: 120%;
    user-select: none;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    :first-child {
      width: auto;
      margin-right: 0.5rem;
    }
  }
`;

const Message = styled.div`
  display: flex;
  color: ${(props) => (props.color ? props.color : '')};
  font-size: 1rem;
  font-weight: bold;
  user-select: none;
  p {
    margin: auto;
  }
`;

const Make = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    problems: [
      {
        index: 1,
        question: '',
        answer: '',
        explanation: '',
        isOX: false,
        choice: [
          { index: 1, content: '' },
          { index: 2, content: '' },
        ],
      },
    ],
  });
  const [curPos, setCurPos] = useState(0);
  const makeRef = useRef(null);
  const navRefs = useRef([0]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addProblem = () => {
    setData({
      ...data,
      problems: [
        ...data.problems,
        {
          index: data.problems.length + 1,
          question: '',
          answer: '',
          explanation: '',
          isOX: false,
          choice: [
            { index: 1, content: '' },
            { index: 2, content: '' },
          ],
        },
      ],
    });
  };

  const autoGrow = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleSave = () => {
    if (data.title === '') {
      return setMessage(['세트 제목을 입력해주세요.', 'red']);
    }

    for (let problem of data.problems) {
      if (problem.question === '') {
        return setMessage(['문제를 입력해주세요.', 'red']);
      }

      if (problem.answer === '') {
        return setMessage(['모든 문제의 답을 정해주세요.', 'red']);
      }
    }
    return axios
      .post(`${process.env.SERVER_URL}collections`, data, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.href = `/solve/${res.data.setId}`;
      });
  };

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
  }, [data]);

  const handleScroll = (e) => {
    for (let i = 0; i < Qpos.length; i++) {
      if (Qpos[i] - 100 < makeRef.current.scrollTop) {
        setCurPos(i);
      }
    }
  };

  const [message, setMessage] = useState(['+ 버튼을 눌러 문제를 추가해보세요.', '']);

  return (
    <MakeContainer onScroll={handleScroll} ref={makeRef}>
      <Header>
        <p>세트 만들기</p>
      </Header>
      <Title
        placeholder="세트 제목을 입력해주세요."
        value={data.title}
        onChange={handleChange}
        name="title"
        onInput={autoGrow}
      />
      <Desc
        placeholder="세트 설명을 입력해주세요."
        value={data.description}
        onChange={handleChange}
        name="description"
        onInput={autoGrow}
      />
      <Divider />
      <SidebarContainer>
        <SideRelative>
          <Sidebar>
            {data.problems.map((problem, idx) => (
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
      {data.problems.map((problem, idx) => (
        <React.Fragment key={`p&d${idx}`}>
          <MakeProblem
            key={problem.index}
            problem={problem}
            data={data}
            setData={setData}
            idx={idx}
            addProblem={addProblem}
            navRefs={navRefs}
          />
          <Divider />
        </React.Fragment>
      ))}
      <ButtonContainer>
        <FaPlusSquare onClick={addProblem} />
        <Message color={message[1]}>
          <p>{message[0]}</p>
        </Message>
        <FaSave onClick={handleSave} />
      </ButtonContainer>
    </MakeContainer>
  );
};

export default Make;
