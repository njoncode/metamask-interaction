import { createStore, applyMiddleware, compose } from 'redux';

import logger from 'redux-logger';

import rootReducer from './rootReducer';

const middlewares = [];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
