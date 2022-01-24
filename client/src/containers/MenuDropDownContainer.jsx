import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuDropDown from '../components/MenuDropDown';
import { logoutAction } from '../modules/loginModal';

// * 컨테이너 컴포넌트

function MenuDropDownContainer({ handleDropDown }) {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  // const { isLogin } = useSelector((state) => ({
  // isLogin: state.loginModal.isLogin,
  // }));

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onlogoutAction = () => dispatch(logoutAction());

  return (
    <MenuDropDown
      // 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
      onlogoutAction={onlogoutAction}
      handleDropDown={handleDropDown}
    />
  );
}

export default MenuDropDownContainer;
