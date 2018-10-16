import { inspect } from 'util';
import {
  PLAY_PAUSE,
  TOGGLE_NOTE
} from '../action-types';

const createInitialNoteState = () => {
  const steps = 64;
  const notesPerStep = 13;

  const notes = {};
  let counter = 0;
  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < notesPerStep; j++) {
      notes[counter] = {
        stepPos: i,
        notePos: j,
        isActive: false
      };
      counter++;
    }
  }
  return notes;
}

const initialState = {
  isPaused: true,
  notes: createInitialNoteState()
};

const mandachord = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_PAUSE:
      return {
        ...state,
        isPaused: !state.isPaused
      };
    
    case TOGGLE_NOTE:
      const notes = {
        ...state.notes,
        [action.payload.id]: {
          ...state.notes[action.payload.id],
          isActive: !state.notes[action.payload.id].isActive
        }
      }

      debugger;
      
      return {
        ...state,
        ...notes
      };
    
    default:
      return state;
  }
}

export default mandachord;