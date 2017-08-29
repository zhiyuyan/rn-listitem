'use strict'
import * as State from '../../../redux/State';
import _ from 'lodash';

const SHOW_LOADING = 1;
const SHOW_CONTENT = 2;
const SHOW_EMPTY = 3;
const SHOW_LOAD_FAIL = 4;

function fromLoadState(state, result) {
  switch (state) {
    case State.FAIL:
      return SHOW_LOAD_FAIL;
    case State.SUCCESS:
      return _.isEmpty(result) ? SHOW_EMPTY : SHOW_CONTENT;
    default:
      return SHOW_LOADING;
  }
}

module.exports = {SHOW_LOADING, SHOW_CONTENT, SHOW_EMPTY, SHOW_LOAD_FAIL, fromLoadState};