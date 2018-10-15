import { inspect } from 'util';
import initialState from '../store/initial-state';
import {
  PLAY_PAUSE
} from '../action-types';

const mandachord = (state = [], action) => {
  switch (action.type) {
    case PLAY_PAUSE:
      console.log(`PLAY_PAUSE action dispatched`);
      return {
        ...state,
        isPaused: !state.isPaused
      };
    
    default:
      return state;
  }
}

export default (prevState = initialState, action) => {
  switch (action.type) {
    case PLAY_PAUSE:
      console.log(`PLAY_PAUSE action dispatched`)
      return { ...prevState, isPaused: !prevState.isPaused };
    default:
      return prevState;
  }
}