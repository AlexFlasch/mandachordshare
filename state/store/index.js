import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import combinedReducers, { rootInitialState } from '../reducers';

const makeStore = () => {
  return createStore(combinedReducers, rootInitialState, devToolsEnhancer());
};

export { makeStore };
