import { createStore } from 'redux';
import combinedReducers from '../reducers';

const makeStore = (initialState, options) => {
  return createStore(combinedReducers);
}

export {
  makeStore
};