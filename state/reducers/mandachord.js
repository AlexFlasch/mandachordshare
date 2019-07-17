import {
  PLAY_PAUSE,
  TOGGLE_NOTE,
  CHANGE_INSTRUMENT,
  UPDATE_PLAYBACK_TIME
} from '../action-types';
import { BASS, MELODY, PERCUSSION, MILLISECONDS_PER_LOOP } from '../constants';
import {
  getInstrumentFromPosition,
  getInstrumentNoteFromPosition
} from '../../util/instruments';

const createInitialNoteState = () => {
  const steps = 64;
  const notesPerStep = 13;

  const notes = {};
  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < notesPerStep; j++) {
      const instrument = getInstrumentFromPosition(j);
      const instrumentNote = getInstrumentNoteFromPosition(j);

      notes[`${i}:${j}`] = {
        stepPos: i,
        notePos: j,
        isActive: false,
        sound: `${instrument}-${instrumentNote}`
      };
    }
  }
  return notes;
};

export const initialState = {
  playbackTime: 0,
  isPaused: true,
  notes: createInitialNoteState(),
  // TODO: keeping track of the last thing is an anti-pattern. look into moving song-builder to redux-sagas
  lastToggledNote: null,
  lastToggledState: null,
  lastAction: '',
  instruments: {
    [BASS]: { label: 'Adau', value: 1 },
    [MELODY]: { label: 'Adau', value: 1 },
    [PERCUSSION]: { label: 'Adau', value: 1 }
  }
};

const mandachord = (state = initialState, { type, payload }) => {
  switch (type) {
  case PLAY_PAUSE:
    return {
      ...state,
      lastAction: type,
      isPaused: !state.isPaused
    };

  case TOGGLE_NOTE:
    return {
      ...state,
      lastAction: type,
      lastToggledNote: payload.id,
      lastToggledState: !state.notes[payload.id].isActive,
      notes: {
        ...state.notes,
        [payload.id]: {
          ...state.notes[payload.id],
          isActive: !state.notes[payload.id].isActive
        }
      }
    };

  case CHANGE_INSTRUMENT:
    return {
      ...state,
      lastAction: type,
      instruments: {
        [payload.instrumentType]: payload.instrument
      }
    };

  case UPDATE_PLAYBACK_TIME:
    let newPlaybackTime =
        (state.playbackTime + payload.delta) % MILLISECONDS_PER_LOOP;

    if (newPlaybackTime >= MILLISECONDS_PER_LOOP) {
      newPlaybackTime -= MILLISECONDS_PER_LOOP;
    }

    return {
      ...state,
      lastAction: type,
      playbackTime: newPlaybackTime
    };

  default:
    return state;
  }
};

export default mandachord;
