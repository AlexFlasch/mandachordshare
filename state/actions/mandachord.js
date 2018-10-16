import {
  PLAY_PAUSE,
  TOGGLE_NOTE
} from '../action-types';

export const playPauseMandachord = () => ({ type: PLAY_PAUSE });
export const toggleNote = (stepPos, notePos) => ({ type: TOGGLE_NOTE, payload: { stepPos, notePos } });
