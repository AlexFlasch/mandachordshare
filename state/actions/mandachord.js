import { PLAY_PAUSE, TOGGLE_NOTE, CHANGE_INSTRUMENT } from '../action-types';

export const playPauseMandachord = () => ({ type: PLAY_PAUSE });
export const toggleNote = id => ({ type: TOGGLE_NOTE, payload: { id } });
export const changeInstrument = (instrumentType, value) => ({
  type: CHANGE_INSTRUMENT,
  payload: { instrumentType, value }
});
