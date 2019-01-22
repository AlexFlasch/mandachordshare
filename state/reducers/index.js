import { combineReducers } from 'redux';

import mandachordReducer, {
  initialState as mandachordInitialState
} from './mandachord';

export default combineReducers({
  mandachord: mandachordReducer
});
