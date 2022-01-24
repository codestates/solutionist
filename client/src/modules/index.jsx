import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import storageSession from 'redux-persist/lib/storage/session';
import loginModal from './loginModal';

const persistConfig = {
  key: 'root',
  storage,
  // storage: storageSession,
  // whitelist: ['loginModal'],
  // blacklist -> 배열안에 persist 제외할 module 넣기
};

const rootReducer = combineReducers({ loginModal });

export default persistReducer(persistConfig, rootReducer);
