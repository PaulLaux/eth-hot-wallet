import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import home from 'containers/HomePage/reducer';
import homeSaga from 'containers/HomePage/saga';
import header from 'containers/Header/reducer';
import headerSaga from 'containers/Header/saga';
import sendtoken from 'containers/SendToken/reducer';
import tokenchooser from 'containers/TokenChooser/reducer';

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: { home, header, sendtoken, tokenchooser },
    middleware: (getDefault) => getDefault({ thunk: false }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(function* rootSaga() {
    yield all([homeSaga(), headerSaga()]);
  });
  return store;
}
