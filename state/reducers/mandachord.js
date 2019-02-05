import { PLAY_PAUSE, TOGGLE_NOTE, CHANGE_INSTRUMENT } from '../action-types';
import { BASS, MELODY, PERCUSSION } from '../constants';
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
        isPaused: !state.isPaused
      };

    case TOGGLE_NOTE:
      return {
        ...state,
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
        instruments: {
          [payload.instrumentType]: payload.value
        }
      };

    default:
      return state;
  }
};

export default mandachord;
