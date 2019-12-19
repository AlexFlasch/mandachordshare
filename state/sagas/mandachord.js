import { takeLatest, call, select } from 'redux-saga/effects';
import {
  selectCurrentStep,
  selectInstrumentSprites,
  selectNotesAsSong,
  selectIsPlaying
} from '../selectors/mandachord';
// import { getInstrumentTypeForNote } from '../../util/helpers';
import createAudioScheduler from '../../audio/audio-scheduler';

import {
  UPDATE_PLAYBACK_TIME,
  PLAY_PAUSE,
  TOGGLE_NOTE,
  SET_CLIENT_IS_LOADED,
  CHANGE_INSTRUMENT
} from '../action-types';

import Tone from 'tone';

let audioScheduler;
let sequence;

// function* playSong() {
//   const currentStep = yield select(selectCurrentStep);
//   const instrumentSprites = yield select(selectInstrumentSprites);
//   const song = yield select(selectNotesAsSong);

//   if (song[currentStep].length > 0 && currentStep !== lastStep) {
//     song[currentStep].forEach(note => {
//       const instrument = getInstrumentTypeForNote(note.sound).toLowerCase();
//       instrumentSprites[instrument].play(note.sound);
//     });
//   }

//   lastStep = currentStep;
// }

// function* initializeAudioScheduler() {
//   audioScheduler = yield call(createAudioScheduler);
// }

// function* playPauseAudioScheduler() {
//   const isPlaying = yield select(selectIsPlaying);

//   yield call(audioScheduler.playPause, isPlaying);
// }

// function* updateAudioSchedulerSteps() {
//   const song = yield select(selectNotesAsSong);

//   console.log('sending all steps to scheduler: ', song);
//   yield call(audioScheduler.updateAllSteps, song);
// }

// function* updateAudioSchedulerCurrentStep() {
//   const currentStep = yield select(selectCurrentStep);

//   yield call(audioScheduler.updateCurrentStep, currentStep);
// }

// function* updateAudioSchedulerInstruments() {
//   const instrumentSprites = yield select(selectInstrumentSprites);

//   yield call(audioScheduler.updateInstruments, instrumentSprites);
// }

const createSequence = () => {
  // array from 1 to 64
  const noteEvents = [...Array(64).keys()].map(val => val + 1);

  sequence = new Tone.Sequence(
    (time, col) => {
      console.log('time: ', time);
      console.log('col: ', col);
    },
    noteEvents,
    '16n'
  ).start('+0.1n');
  // create a 64 column step sequencer, with each column being a 16th note
  // start(0) tells the sequencer to start playing at time 0 when its played
};

const playPauseSequencer = async () => {
  if (Tone.context.state === 'suspended') {
    await Tone.context.resume();
  }
};

function* initializeSequencer() {
  yield call(createSequence);
}

function* playPauseSaga() {
  yield call(playPauseSequencer);
}

function* updateToneTransports() {}

export default function* mandachordSaga() {
  yield takeLatest(SET_CLIENT_IS_LOADED, initializeSequencer);
  // yield takeLatest(CHANGE_INSTRUMENT, updateAudioSchedulerCurrentStep);
  // yield takeLatest(UPDATE_PLAYBACK_TIME, updateAudioSchedulerCurrentStep);
  yield takeLatest(PLAY_PAUSE, playPauseSaga);
  // yield takeLatest(TOGGLE_NOTE, updateAudioSchedulerSteps);

  yield takeLatest(TOGGLE_NOTE, updateToneTransports);
}
