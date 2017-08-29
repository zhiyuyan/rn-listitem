/**
 * Created by Jackoder on 2017/5/27.
 */
'use strict';
import _ from 'lodash';
import {PENDING, FULFILLED, REJECTED} from 'redux-promise-middleware';
import * as State from '../State';
import * as Toast from '../../components/Toast';

const PageStateKey = 'loadState';

const initialState = {
  loadState: State.UNDEFINED
};

const base = (oldState = initialState, action, type, pending, fulfilled, rejected) => {
  const actionType = action.type;
  if (actionType.startsWith(type)) {
    if (actionType.endsWith(PENDING)) {
      return pending && pending(oldState, action) || oldState;
    } else if (actionType.endsWith(FULFILLED)) {
      return fulfilled && fulfilled(oldState, action);
    } else if (actionType.endsWith(REJECTED)) {
      return rejected && rejected(oldState, action) || oldState;
    }
  }
  return oldState;
};

const simple = (oldState = initialState, action, type, payloadConverter, pending, fulfilled, rejected) => (
  base(oldState, action, type,
    (oldState, action) => {
      let newState = Object.assign({}, oldState);
      newState[PageStateKey] = State.LOADING;
      return newState;
    }, (oldState, action) => {
      if (fulfilled) {
        return fulfilled(oldState, action);
      } else {
        let newState = Object.assign({}, oldState, payloadConverter ? payloadConverter(action.payload) : action.payload);
        newState[PageStateKey] = State.SUCCESS;
        return newState;
      }
    }, (oldState, action) => {
      if (rejected) {
        return rejected(oldState, action);
      } else {
        let newState = Object.assign({}, oldState);
        newState[PageStateKey] = State.FAIL;
        let msg;
        if (typeof (action.payload) === 'string') {
          msg = action.payload;
        } else {
          msg = _.get(action.payload, 'message');
        }
        msg && Toast.show(msg, Toast.SHORT);
        return newState;
      }
    }
  )
);

module.exports = {PageStateKey, base, simple};
