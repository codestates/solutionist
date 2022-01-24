import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginModal from '../components/LoginModal';
import {
  modalOffAction,
  loginAction,
  logoutAction,
  updateUserInfoAction,
} from '../modules/loginModal';

// * 컨테이너 컴포넌트

function LoginModalContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { isLoginModalOn, isLogin, userInfo } = useSelector((state) => ({
    isLoginModalOn: state.loginModal.isLoginModalOn,
    isLogin: state.loginModal.isLogin,
    // userInfo: state.loginModal.userInfo,
  }));

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onModalOffAction = () => dispatch(modalOffAction());
  const onloginAction = () => dispatch(loginAction());
  const onlogoutAction = () => dispatch(logoutAction());
  const onUpdateUserInfoAction = (data) => dispatch(updateUserInfoAction(data));

  return (
    <LoginModal
      // 상태와
      isLoginModalOn={isLoginModalOn}
      isLogin={isLogin}
      // 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
      onModalOffAction={onModalOffAction}
      onloginAction={onloginAction} // isLogin을 true로 변경하는 함수
      onlogoutAction={onlogoutAction}
      onUpdateUserInfoAction={onUpdateUserInfoAction}
    />
  );
}

export default LoginModalContainer;
