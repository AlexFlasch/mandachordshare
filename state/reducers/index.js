import { combineReducers } from 'redux';

import mandachordReducer from './mandachord';

export const initialState = {
    isPlaying: false
};

export default combineReducers({
    mandachord: mandachordReducer
});