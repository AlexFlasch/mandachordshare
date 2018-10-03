import { combineReducers } from 'redux';

import mandachordReducer from './mandachord';

export const initialState = {
    isPlaying: false
};

const rootReducer = (state = initialState, action) => state;

export default combineReducers({
    mandachord: mandachordReducer
});