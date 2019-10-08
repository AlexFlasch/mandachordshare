import { takeLatest } from 'redux-saga/effects';

import { UPDATE_PLAYBACK_TIME } from '../action-types';

function* playSong() {
  yield console.log('I\'m working!');
}

export default function* mandachordSaga() {
  yield takeLatest(UPDATE_PLAYBACK_TIME, playSong);
}
