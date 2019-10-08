import { takeLatest, select } from 'redux-saga/effects';
import {
  selectCurrentStep,
  selectInstrumentSprites,
  selectNotesAsSong
} from '../selectors/mandachord';
import { getInstrumentTypeForNote } from '../../util/helpers';

import { UPDATE_PLAYBACK_TIME } from '../action-types';

function* playSong() {
  const currentStep = yield select(selectCurrentStep);
  const instrumentSprites = yield select(selectInstrumentSprites);
  const song = yield select(selectNotesAsSong);

  if (song[currentStep % 64].length > 0) {
    song[currentStep % 64].forEach(note => {
      console.log('attempting to play: ', note.sound);
      const instrument = getInstrumentTypeForNote(note.sound).toLowerCase();
      console.log('instrument: ', instrument);
      console.log('instrumentSprites: ', instrumentSprites);
      instrumentSprites[instrument].play(note.sound);
    });
    // playAudioSpriteForNote('horos', );
  }
}

export default function* mandachordSaga() {
  yield takeLatest(UPDATE_PLAYBACK_TIME, playSong);
}
