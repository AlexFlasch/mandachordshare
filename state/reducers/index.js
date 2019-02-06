import { combineReducers } from 'redux';

import mandachordReducer, {
  initialState as mandachordInitialState
} from './mandachord';

export const rootInitialState = {
  mandachord: mandachordInitialState
};

export default combineReducers({
  mandachord: mandachordReducer
});
