import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ShareIcon from '../icons/Share';
import ChartIcon from '../icons/Chart';
import UserIcon from '../icons/User';
import EditIcon from '../icons/Edit';
import DecreaseIcon from '../icons/Decrease';
import TrashIcon from '../icons/Trash';

import UpdateIcon from '../icons/Update';
import KakaoIcon from '../icons/Kakao';
import { GrDocumentUpdate } from 'react-icons/gr';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { RiKakaoTalkLine, RiClipboardLine } from 'react-icons/ri';
import { VscOutput } from 'react-icons/vsc';

import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useNavigate } from 'react-router-dom';
import { deleteSets } from '../api/SearchSetAPI';

const CardContainer = styled.div`
  position: relative;
  perspective: 1000px;
  margin: 0.5rem;
  display: ${(props) => (props.$display ? 'none' : '')};

  width: 10rem;
  height: 12rem;
`;
const CardFront = styled.div`
  width: 10rem;
  height: 12rem;
  background-color: white;
  border: 1px solid var(--warm-grey);
  border-radius: 10px;
  backface-visibility: hidden;
  transform: ${(props) => (props.isFlipped ? 'rotateY(-180deg)' : '')};
  transition: 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  cursor: pointer;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 1.5rem);
  margin: 0.75rem;
  /* height: calc(100% - 1rem); */
  /* margin: 0.5rem; */
`;
const SetInfo = styled.div``;
const SetName = styled.div`
  font-size: 1rem;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 120%;
  font-weight: bold;
`;
const SetDesc = styled.div`
  margin-top: 0.75rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: keep-all;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 120%;

  &.align-right {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
  }
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  /* justify-content: space-between; */
  /* align-items: flex-end; */
  /* justify-self: flex-end; */
  * {
    font-family: 'GowunDodum-Regular', sans-serif;
  }
`;
const Icon = styled.div`
  width: 1rem;
  height: 1rem;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;
const StatsContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Stat = styled.li`
  display: flex;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  justify-content: space-between;
  > p {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
  }
`;
const CardBack = styled.div`
  position: absolute;
  top: 0;
  width: 10rem;
  height: 12rem;
  border-radius: 10px;
  border: 1px solid var(--warm-grey);
  background-color: var(--warm-grey);
  backface-visibility: hidden;
  transform: ${(props) => (props.isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)')};
  transition: 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  > div {
    height: calc(100% - 1rem);
    margin: 0.5rem;
  }
`;
const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;
const Menu = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
  margin: auto;
  color: white;
  cursor: pointer;

  > span:hover {
    color: var(--orangey-yellow);
    /* fill: var(--orange-yellow); */
  }

  > svg:hover {
    color: var(--orangey-yellow);
    /* fill: var(--orangey-yellow); */
  }

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
  margin: auto;
  color: white;
  stroke: white;

  > span:hover {
    color: var(--orangey-yellow);
    /* fill: var(--orange-yellow); */
  }

  > svg:hover {
    color: var(--white);
    /* fill: var(--orangey-yellow); */
  }
`;

const SetCardVerTwo = ({
  isSearch,
  averageScore,
  id,
  createdAt,
  creator,
  description,
  solvedUserNumber,
  title,
  updatedAt,
  isMade,
  collectionId,
  recordId,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [isHidden, setIsHidden] = useState(false);
  const handleDelete = () => {
    setIsHidden(true);
    deleteSets(collectionId)
      .then(() => {
        // console.log('삭제 성공');
      })
      .catch((err) => {
        // console.log('캐치에러', err)
      });
  };

  const [isShare, setIsShare] = useState(false);
  const handleShare = () => {
    setIsShare(!isShare);
  };

  // TODO : 동작은 하는데 알림이 없음 ex)클립보드에 저장 완료 메시지
  const solveUrl = `https://solutionist.site/solve/${id}`;
  // console.log('solve$id', solveUrl);

  // * 카카오 공유하기
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(`${process.env.KAKAO_JS_KEY}`);
    }
  }, []);

  const shareKakao = () => {
    console.log('카카오 공유 버튼');
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `${title} 문제 풀기`,
        description: `문제 풀러 가볼까요?`,
        imageUrl:
          'https://user-images.githubusercontent.com/73838733/150278687-d065323b-f6db-4197-b97c-7b84293a9fcf.png',
        link: {
          mobileWebUrl: 'https://solutionist.site/solve/' + id,
        },
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: 'https://solutionist.site/solve/' + id,
          },
        },
      ],
    });
  };

  // TODO : SetName, SetDesc, 90명, 90점 하드코딩 props로 수정

  // 검색 페이지 카드세트일 때 뒤집어지지 않고, solve로 navigate
  const navigate = useNavigate();
  const handleGoSolve = () => {
    // console.log('검색일 때 카드 클릭 콘솔로그');
    navigate(`/solve/${id}`);
  };

  const koCreatedAt = new Date(createdAt).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });

  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  return (
    <CardContainer $display={isHidden}>
      {isSearch ? (
        <CardFront onClick={handleGoSolve}>
          <InfoContainer>
            <SetInfo>
              <SetName>{title}</SetName>
              {/* <SetDesc>{creator}</SetDesc> */}
              <SetDesc className="align-right">{timeForToday(updatedAt)} 수정됨</SetDesc>
              {/* <SetDesc>{koCreatedAt}</SetDesc> */}
              <SetDesc>{description}</SetDesc>
            </SetInfo>
            <IconContainer>
              <StatsContainer>
                {averageScore ? (
                  <Stat>
                    <Icon>
                      <ChartIcon />
                    </Icon>
                    <p>{Math.round(averageScore)}점</p>
                  </Stat>
                ) : (
                  ''
                )}
                <Stat>
                  <Icon>
                    <UserIcon />
                  </Icon>
                  <p>{solvedUserNumber}명</p>
                </Stat>
              </StatsContainer>
            </IconContainer>
          </InfoContainer>
        </CardFront>
      ) : (
        <>
          <CardFront isFlipped={isFlipped} onClick={() => setIsFlipped(true)}>
            <InfoContainer>
              <SetInfo>
                <SetName>{title}</SetName>
                {/* <SetDesc>{creator}</SetDesc> */}
                <SetDesc className="align-right">
                  {updatedAt ? timeForToday(updatedAt) : timeForToday(createdAt)} 수정됨
                </SetDesc>
                {/* <SetDesc>{koCreatedAt}</SetDesc> */}
                <SetDesc>{description}</SetDesc>
              </SetInfo>
              <IconContainer>
                <StatsContainer>
                  {averageScore ? (
                    <Stat>
                      <Icon>
                        <ChartIcon />
                      </Icon>
                      <p>{Math.round(averageScore)}점</p>
                    </Stat>
                  ) : (
                    ''
                  )}
                  <Stat>
                    <Icon>
                      <UserIcon />
                    </Icon>
                    <p>{solvedUserNumber}명</p>
                  </Stat>
                </StatsContainer>
              </IconContainer>
            </InfoContainer>
          </CardFront>
          <CardBack isFlipped={isFlipped}>
            <InfoContainer>
              <MenuContainer>
                <Menu>
                  <StyledLink to={/solve/ + id}>
                    <EditIcon fill="white" /> <span>풀기</span>
                    {/* // TODO : /solve 로 이동 */}
                  </StyledLink>
                </Menu>
                <Menu>
                  <StyledLink to={/edit/ + id}>
                    <UpdateIcon fill="none" stroke="white" strokeWidth="2" />{' '}
                    <span>수정</span>
                    {/* <GrDocumentUpdate stroke="#fff" strokeWidth="2" /> 수정 */}
                    {/* // TODO : /edit 로 이동 */}
                  </StyledLink>
                </Menu>
                <Menu onClick={handleShare}>
                  {isShare ? (
                    <>
                      <CopyToClipboard text={solveUrl}>
                        <RiClipboardLine />
                      </CopyToClipboard>
                      <RiKakaoTalkLine onClick={shareKakao} />
                    </>
                  ) : (
                    <>
                      <ShareIcon fill="white" /> <span>공유</span>
                    </>
                  )}
                  {/* // TODO : 클립보드 & 카카오 공유 선택 */}
                </Menu>
                {isMade && (
                  <Menu onClick={handleDelete}>
                    <TrashIcon fill="white" /> <span>삭제</span>
                    {/* // TODO : display:none? 안보이게 처리 */}
                  </Menu>
                )}
                {!isMade && (
                  <Menu>
                    <StyledLink to={/result/ + id + '/' + recordId}>
                      <VscOutput /> <span>결과</span>
                    </StyledLink>
                  </Menu>
                )}
              </MenuContainer>
              <Icon onClick={() => setIsFlipped(false)}>
                <DecreaseIcon fill="white" />
              </Icon>
            </InfoContainer>
          </CardBack>
        </>
      )}
    </CardContainer>
  );
};

export default SetCardVerTwo;
