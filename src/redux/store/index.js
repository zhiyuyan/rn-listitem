/**
 * Created by Jackoder on 2017/6/28.
 */
'use strict';

import {createStore as baseCreateStore, applyMiddleware, compose} from 'redux';

import isDevelopMode from '../../utils/isDevelopMode';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

function createStoreEnhancer() {
  if (isDevelopMode()) {
    let logger = createLogger();
    let enhancer = applyMiddleware(thunk, logger);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return composeEnhancers(enhancer);
  } else {
    let enhancer = applyMiddleware(thunk);
    return enhancer;
  }
}

const enhancer = createStoreEnhancer();
const createStore = applyMiddleware(promiseMiddleware())(baseCreateStore);

module.exports = {enhancer, createStore};

