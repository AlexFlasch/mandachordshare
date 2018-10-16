import { createStore } from 'redux';
import combinedReducers from '../reducers';

const makeStore = () => {
  return createStore(combinedReducers);
}

export {
  makeStore
};