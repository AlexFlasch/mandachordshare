import { fork } from 'redux-saga/effects';

import mandachordSaga from './mandachord';

export default function* rootSaga() {
  yield fork(mandachordSaga);
}
