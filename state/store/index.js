import { createStore } from 'redux';
import combinedReducers from '../reducers';

const makeStore = () => {
  return createStore(
    combinedReducers,
    typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export { makeStore };
