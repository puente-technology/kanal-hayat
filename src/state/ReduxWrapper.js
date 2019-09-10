/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '.';


const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
);

const store = createStore(rootReducer, enhancer);


export default ({ element }) => (
  <Provider store={store}>
    {element}
  </Provider>
);
