import { createStore } from 'redux';
import initialState from './initial-state';
import combinedReducers from '../reducers';

const store = createStore(combinedReducers, initialState);

export default store;