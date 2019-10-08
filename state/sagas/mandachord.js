import { takeLatest, select } from 'redux-saga/effects';
import {
  selectCurrentStep,
  selectInstrumentSprites,
  selectNotesAsSong
} from '../selectors/mandachord';
import { getInstrumentTypeForNote } from '../../util/helpers';

import { UPDATE_PLAYBACK_TIME } from '../action-types';

// is this an anti-pattern? investigate further
let lastStep;

function* playSong() {
  const currentStep = yield select(selectCurrentStep);
  const instrumentSprites = yield select(selectInstrumentSprites);
  const song = yield select(selectNotesAsSong);

  if (song[currentStep].length > 0 && currentStep !== lastStep) {
    song[currentStep].forEach(note => {
      console.log('attempting to play: ', note.sound);
      const instrument = getInstrumentTypeForNote(note.sound).toLowerCase();
      instrumentSprites[instrument].play(note.sound);
    });
    // playAudioSpriteForNote('horos', );
  }

  lastStep = currentStep;
}

export default function* mandachordSaga() {
  yield takeLatest(UPDATE_PLAYBACK_TIME, playSong);
}
